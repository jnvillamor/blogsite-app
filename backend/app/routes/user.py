from app.core.database import get_db
from app.models.user import User
from app.schemas import UserBase, UserCreate, UserRead
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter(
  prefix="/auth",
  tags=["auth"],
  responses={404: {"description": "Not found"}}
)

@router.post('/users')
async def create_user(user: UserCreate, db: Session =Depends(get_db)):
  existing_user = db.query(User).filter(User.email == user.email).first()

  if existing_user:
    raise HTTPException(status_code=400, detail="Email already registered")
  
  return {
    "message": "User created successfully",
    "user": user
  }