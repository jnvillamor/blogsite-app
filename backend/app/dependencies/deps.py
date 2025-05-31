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
from app.schemas import TokenPayload

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", scheme_name="JWT")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
  try:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    token_data = TokenPayload.model_validate(payload)
    print(f"Decoded token data: {token_data}", flush=True)

    if token_data.exp.timestamp() < datetime.now(timezone.utc).timestamp():
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token has expired",
        headers={"WWW-Authenticate": "Bearer"},
      )
    
    print(f"Token data: {token_data}", flush=True)
    user = db.query(User).filter(User.id == int(token_data.sub)).first()
    
    if not user:
      raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found",
        headers={"WWW-Authenticate": "Bearer"},
      )
    
    return user
  except Exception as e:
    print(e, flush=True)
    print(f"Error retrieving user: {e}", flush=True)
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="Internal server error",
      headers={"WWW-Authenticate": "Bearer"},
    )
  except (jwt.PyJWTError, ValidationError) as e:
    print(f"Token validation error: {e}", flush=True)
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Invalid token",
      headers={"WWW-Authenticate": "Bearer"},
    ) from e
  
