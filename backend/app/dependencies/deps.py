from typing import Union, Any
from datetime import datetime, timezone
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.models import User
import jwt
from pydantic import ValidationError
from app.schemas import TokenPayload, UserRead

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", scheme_name="JWT")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> UserRead:
  try:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    token_data = TokenPayload.model_validate(payload)

    if datetime.fromtimestamp(token_data.exp) < datetime.now(timezone.utc):
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token has expired",
        headers={"WWW-Authenticate": "Bearer"},
      )
    
    user = db.query(User).filter(User.id == token_data.sub).first()
    
    if not user:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found",
        headers={"WWW-Authenticate": "Bearer"},
      )
    
    return UserRead.model_validate(user).model_dump()
  except (jwt.PyJWTError, ValidationError) as e:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid token",
      headers={"WWW-Authenticate": "Bearer"},
    ) from e
  
