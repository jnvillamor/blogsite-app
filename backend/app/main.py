from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import register_routes

def create_app() -> FastAPI:
  app = FastAPI()

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