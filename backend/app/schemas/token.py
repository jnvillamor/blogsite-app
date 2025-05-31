from pydantic import BaseModel
from datetime import datetime

class TokenSchema(BaseModel):
  access_token: str
  refresh_token: str

class TokenPayload(BaseModel):
  sub: int
  exp: datetime