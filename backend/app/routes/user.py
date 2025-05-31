from app.core.database import get_db
from app.models.user import User
from app.schemas import UserBase, UserCreate, UserRead
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.utils import hash_password

router = APIRouter(
  prefix="/auth",
  tags=["auth"],
  responses={404: {"description": "Not found"}}
)

@router.post('/register', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: Session =Depends(get_db)):
  try:
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
      raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    user.password = hashed_password

    new_user = User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return UserRead.model_validate(new_user).model_dump()
  except Exception as e:
    print(f"Error creating user: {e}", flush=True)
    raise HTTPException(status_code=500, detail="Internal server error")
  
@router.get('/users/{user_id}', response_model=UserRead, status_code=status.HTTP_200_OK)
def get_user(user_id: int, db: Session = Depends(get_db)):
  try:
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
      raise HTTPException(status_code=404, detail="User not found")
    
    return UserRead.model_validate(user).model_dump()
  except Exception as e:
    print(f"Error retrieving user: {e}", flush=True)
    raise HTTPException(status_code=500, detail="Internal server error")