from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from datetime import datetime, timezone
from sqlalchemy.orm import relationship
from app.core.database import Base

class Comment(Base):
  __tablename__ = "comments"

  id = Column(Integer, primary_key=True, index=True)
  content = Column(String, nullable=False)
  blog_id = Column(Integer, ForeignKey('blogs.id', ondelete='CASCADE'), index=True, nullable=False)
  author_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), index=True, nullable=False)
  created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
  updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)

  blog = relationship("Blog", back_populates="comments")
  author = relationship("User", back_populates="comments")

  def __repr__(self):
    return f"<Comment(id={self.id}, content={self.content}, post_id={self.post_id}, author_id={self.author_id})>"