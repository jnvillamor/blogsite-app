from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models import Comment, Blog, User
from app.core.database import get_db
from app.schemas.comment import CommentCreate, CommentResponse
from app.dependencies.deps import get_current_user

router = APIRouter(
  prefix="/comments",
  tags=["comments"],
)

@router.post("/", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(
  comment: CommentCreate,
  current_user: User = Depends(get_current_user),
  db: Session = Depends(get_db)
):
  try:
    print("(/comment) is running.", flush=True)
    blog = db.query(Blog).filter(Blog.id == comment.blog_id).first()
    if not blog:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Blog not found"
      )

    if comment.author_id != current_user.id:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="You do not have permission to create a comment for this user"
      )
    
    new_comment = Comment(
      content=comment.content,
      blog_id=comment.blog_id,
      author_id=comment.author_id
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    print("(/comment) is done.", flush=True) 
    return CommentResponse.model_validate(new_comment).model_dump()
  except HTTPException as http_exc:
    raise http_exc
  except Exception as e:
    print(f"Error in create_comment: {e}", flush=True)
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="An error occurred while creating the comment"
    )