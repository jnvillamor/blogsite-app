from pydantic import Field, EmailStr, BaseModel, computed_field

class UserBase(BaseModel):
  id: int 
  email: EmailStr = Field(..., max_length=100)
  first_name: str = Field(..., max_length=50)
  last_name: str = Field(..., max_length=50)
  hashed_password: str = Field(..., max_length=250)
  created_at: str
  updated_at: str

  @computed_field
  @property
  def full_name(self) -> str:
    return f"{self.first_name} {self.last_name}"
  
  model_config = {
    'from_attributes': True,
  }

class UserCreateBase(UserBase):
  email: EmailStr = Field(..., max_length=100)
  first_name: str = Field(..., max_length=50)
  last_name: str = Field(..., max_length=50)
  password: str = Field(..., min_length=8, max_length=50)

  model_config = { 
    'from_attributes': True,
  }