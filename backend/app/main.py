from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import register_routes
from app.core.alembic_runner import run_migrations
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan event handler."""
    # Run migrations on startup
    run_migrations()
    yield

def create_app() -> FastAPI:
  app = FastAPI(lifespan=lifespan)

  @app.get("/")
  async def root():
    return {"message": "Welcome to the FastAPI application!"}
  
  origins = [
    "hhttp://localhost:3000",
  ]

  app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
  )

  # Register routes
  register_routes(app)

  return app
  
app = create_app()