from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  DATABASE_URL: str
  SECRET_KEY: str
  REFRESH_SECRET_KEY: str
  ALGORITHM: str = "HS256"
  ACCESS_TOKEN_EXPIRE_MINUTES: int = 15

  model_config = SettingsConfigDict(env_file=".env")

settings = Settings()