from pydantic import BaseModel, Field, computed_field
from datetime import datetime
from .user import UserProfile


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

class PaginatedBlogs(BaseModel):
  total: int
  blogs: list[BlogResponse]
  max_pages: int
  current_page: int

  @computed_field
  @property
  def has_next(self) -> bool:
    return self.current_page < self.max_pages
  
  @computed_field
  @property
  def has_previous(self) -> bool:
    return self.current_page > 1
  
  @computed_field
  @property
  def next_page(self) -> int | None:
    return self.current_page + 1 if self.has_next else None
  
  @computed_field
  @property
  def previous_page(self) -> int | None:
    return self.current_page - 1 if self.has_previous else None
  
  model_config = {
    'from_attributes': True,
    'populate_by_name': True,
  }
