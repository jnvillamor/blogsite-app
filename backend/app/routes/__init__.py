from fastapi import FastAPI
from .user import router as user_router

def register_routes(app: FastAPI) -> None:
  app.include_router(user_router)