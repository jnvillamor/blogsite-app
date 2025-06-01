from pydantic import BaseModel, Field, computed_field
from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
  from .user import UserReference

class BlogBase(BaseModel):
  id: int
  title: str
  content: str
  created_at: datetime
  updated_at: datetime

  model_config = { "from_attributes": True }

class BlogCreate(BaseModel):
  title: str = Field(..., min_length=1, max_length=255)
  content: str = Field(..., min_length=1)
  author_id: int = Field(..., gt=0)

class BlogRead(BlogBase):
  author: "UserReference"

class PaginatedBlogs(BaseModel):
  total: int
  page: int
  limit: int
  max_page: int
  data: list[BlogRead]

  model_config = { "from_attributes": True }

  @computed_field
  @property
  def has_next(self) -> bool:
    return self.page < self.max_page

  @computed_field
  @property
  def has_prev(self) -> bool:
    return self.page > 1