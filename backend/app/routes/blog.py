from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import Blog, User
from app.schemas import BlogBase, BlogCreate
from app.dependencies import get_current_user

router = APIRouter(
  prefix="/blogs",
  tags=["blogs"],
)

@router.post("/", response_model=BlogBase, status_code=status.HTTP_201_CREATED)
async def create_blog(
  blog: BlogCreate,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user)
):
  user = db.query(User).filter(User.id == blog.author_id).first()
  if not user:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="User not found"
    )
  
  if user.id != current_user.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You do not have permission to create a blog for this user"
    )
  
  new_blog = Blog(**blog.model_dump())
  db.add(new_blog)
  db.commit()
  db.refresh(new_blog)

  return BlogBase.model_validate(new_blog).model_dump()

@router.get("/", response_model=list[BlogBase])
async def get_blogs(
  db: Session = Depends(get_db),
  page: int = 1,
  limit: int = 10
):
  blogs = db.query(Blog).offset((page - 1) * limit).limit(limit).all()
  return [BlogBase.model_validate(blog).model_dump() for blog in blogs]