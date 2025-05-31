from fastapi import FastAPI

def create_app() -> FastAPI:
  app = FastAPI()

  @app.get("/")
  async def root():
    return {"message": "Welcome to the FastAPI application!"}
  
  return app
  
app = create_app()