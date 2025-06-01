from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func
from app.core.database import Base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

class Blog(Base):
  __tablename__ = "blogs"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String(255), nullable=False)
  content = Column(Text, nullable=False)
  author_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
  updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)

  author = relationship("User", back_populates="blogs")

  def __repr__(self):
    return f"<Blog(id={self.id}, title={self.title}, author_id={self.author_id})>"