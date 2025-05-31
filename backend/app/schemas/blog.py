from pydantic import BaseModel, Field
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