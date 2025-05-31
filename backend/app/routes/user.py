from app.core.database import get_db
from app.models.user import User
from app.schemas import UserBase, UserCreateBase
from fastapi import APIRouter

session = get_db()
router = APIRouter(
  prefix="/auth",
  tags=["auth"],
  responses={404: {"description": "Not found"}}
)

@router.post('/users')
async def create_user(user: UserCreateBase):
  pass