from pydantic import Field, EmailStr, BaseModel, computed_field
from typing import TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
  from .blog import BlogBase

class UserBase(BaseModel):
  email: EmailStr = Field(..., max_length=100)
  first_name: str = Field(..., max_length=50)
  last_name: str = Field(..., max_length=50)
  
  model_config = {
    'from_attributes': True,
  }

class UserCreate(UserBase):
  password: str = Field(..., min_length=8, max_length=50)

  model_config = { 
    'from_attributes': True,
  }

class UserReference(UserBase):
  id: int

  @computed_field
  @property
  def full_name(self) -> str:
    return f"{self.first_name} {self.last_name}"

  model_config = {
    'from_attributes': True,
  }

class UserRead(UserBase):
  id: int
  blogs: list["BlogBase"]
  created_at: datetime
  updated_at: datetime

  @computed_field
  @property
  def full_name(self) -> str:
    return f"{self.first_name} {self.last_name}"
  
  @computed_field
  @property
  def blog_count(self) -> int:
    return len(self.blogs) if hasattr(self, 'blogs') and self.blogs is not None else 0

  model_config = {
    'from_attributes': True,
  }