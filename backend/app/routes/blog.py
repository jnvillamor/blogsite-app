from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import Blog, User
from app.schemas import BlogBase, BlogCreate, PaginatedBlogs
from app.dependencies import get_current_user
from math import ceil

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

@router.get("/", response_model=PaginatedBlogs)
async def get_blogs(
  db: Session = Depends(get_db),
  page: int = 1,
  limit: int = 10
):
  offset = (page - 1) * limit
  total = db.query(Blog).count()
  max_page = ceil(total / limit) if total else 1
  blogs = db.query(Blog).offset(offset).limit(limit).all()

  paginated_blogs = PaginatedBlogs(
    total=total,
    page=page,
    limit=limit,
    max_page=max_page,
    data=[BlogBase.model_validate(blog).model_dump() for blog in blogs]
  )

  return paginated_blogs.model_dump()

@router.get("/{blog_id}", response_model=BlogBase, status_code=status.HTTP_200_OK)
async def get_blog(
  blog_id: int,
  db: Session = Depends(get_db)
):
  blog = db.query(Blog).filter(Blog.id == blog_id).first()
  if not blog:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Blog not found"
    )
  
  return BlogBase.model_validate(blog).model_dump()

@router.delete("/{blog_id}", status_code=status.HTTP_200_OK)
async def delete_blog(
  blog_id: int,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user)
):
  blog = db.query(Blog).filter(Blog.id == blog_id).first()
  if not blog:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Blog not found"
    )
  
  if blog.author_id != current_user.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You do not have permission to delete this blog"
    )
  
  db.delete(blog)
  db.commit()

  return {"detail": "Blog deleted successfully"}

@router.put("/{blog_id}", response_model=BlogBase, status_code=status.HTTP_200_OK)
async def update_blog(
  blog: BlogCreate,
  blog_id: int,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user),
):
  existing_blog = db.query(Blog).filter(Blog.id == blog_id).first()
  if not existing_blog:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Blog not found"
    )

  if existing_blog.author_id != current_user.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="You do not have permission to update this blog"
    )
  
  db.query(Blog).filter(Blog.id == blog_id).update(blog.model_dump())
  db.commit()
  db.refresh(existing_blog)

  return BlogBase.model_validate(existing_blog).model_dump()
  