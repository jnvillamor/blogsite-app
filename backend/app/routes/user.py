from app.core.database import get_db
from app.models.user import User
from app.schemas import UserCreate, UserDetails, UserProfile, TokenSchema
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.utils import hash_password, verify_password, create_access_token, create_refresh_token
from fastapi.security import OAuth2PasswordRequestForm
from app.dependencies import get_current_user

router = APIRouter(
  prefix="/auth",
  tags=["auth"],
  responses={404: {"description": "Not found"}}
)

@router.post('/register', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: Session =Depends(get_db)):
  existing_user = db.query(User).filter(User.email == user.email).first()

  if existing_user:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
  
  hashed_password = hash_password(user.password)
  user.password = hashed_password

  new_user = User(**user.model_dump())
  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  return UserProfile.model_validate(new_user).model_dump()
  
@router.get('/users/{user_id}', response_model=UserDetails, status_code=status.HTTP_200_OK)
def get_user(user_id: int, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.id == user_id).first()
  
  if not user:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
  
  return UserDetails.model_validate(user).model_dump()

@router.post("/login", response_model=TokenSchema, status_code=status.HTTP_200_OK)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  try:
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User is not found")
    
    if not verify_password(form_data.password, user.password):
      raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    
    return TokenSchema(
      access_token=create_access_token(user.id),
      refresh_token=create_refresh_token(user.id)
    ).model_dump()
  except Exception as e:
    print(f"Error during login: {e}")
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/me", response_model=UserProfile, status_code=status.HTTP_200_OK)
async def get_me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  return UserProfile.model_validate(current_user).model_dump()
