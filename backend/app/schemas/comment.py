from pydantic import BaseModel
from datetime import datetime

class CommentBase(BaseModel):
  content: str

class CommentCreate(CommentBase):
  blog_id: int
  author_id: int

  model_config = {
    'from_attributes': True,
  } 

class CommentResponse(CommentBase):
  id: int
  blog_id: int
  author_id: int
  created_at: datetime 
  updated_at: datetime

  model_config = {
    'from_attributes': True,
  }
