from pydantic import BaseModel
from datetime import datetime

class Token(BaseModel):
  access_token: str
  refresh_token: str
  token_type: str = "bearer"

class TokenData(BaseModel):
  user_id: int
  type: str
  exp: datetime