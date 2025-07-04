from fastapi import FastAPI
from .user import router as user_router
from .blog import router as blog_router
from .comment import router as comment_router

def register_routes(app: FastAPI) -> None:
  app.include_router(user_router)
  app.include_router(blog_router)
  app.include_router(comment_router)