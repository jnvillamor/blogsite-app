from pydantic import BaseModel, Field, computed_field
from app.schemas import Author

class BlogBase(BaseModel):
  id: int
  title: str
  content: str
  author: Author

  model_config = { "from_attributes": True }

class BlogCreate(BaseModel):
  title: str = Field(..., min_length=1, max_length=255)
  content: str = Field(..., min_length=1)
  author_id: int = Field(..., gt=0)


class PaginatedBlogs(BaseModel):
  total: int
  page: int
  limit: int
  max_page: int
  blogs: list[BlogBase]

  model_config = { "from_attributes": True }

  @computed_field
  @property
  def has_next(self) -> bool:
    return self.page < self.max_page

  @computed_field
  @property
  def has_prev(self) -> bool:
    return self.page > 1