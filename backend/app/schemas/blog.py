from pydantic import BaseModel, Field, computed_field
from datetime import datetime
from .user import UserProfile
from .comment import CommentFetchResponse

class BlogBase(BaseModel):
  title: str
  content: str

class BlogCreate(BlogBase):
  author_id: int 

class BlogResponse(BlogBase):
  id: int
  author: UserProfile
  created_at: datetime
  updated_at: datetime
  comments: list[CommentFetchResponse]

  @computed_field
  @property
  def comment_count(self) -> int:
    return len(self.comments)

  model_config = {
    'from_attributes': True,
  }

class PaginatedBlogs(BaseModel):
  total: int
  data: list[BlogResponse]
  max_page: int
  page: int
  limit: int

  @computed_field
  @property
  def has_next(self) -> bool:
    return self.page < self.max_page
  
  @computed_field
  @property
  def has_previous(self) -> bool:
    return self.page > 1
  
  @computed_field
  @property
  def next_page(self) -> int | None:
    return self.page + 1 if self.has_next else None
  
  @computed_field
  @property
  def previous_page(self) -> int | None:
    return self.page - 1 if self.has_previous else None
  
  model_config = {
    'from_attributes': True,
  }
