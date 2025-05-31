from pydantic import Field, EmailStr, BaseModel, computed_field

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

class UserRead(UserBase):
  id: int 
  created_at: str
  updated_at: str

  @computed_field
  @property
  def full_name(self) -> str:
    return f"{self.first_name} {self.last_name}"