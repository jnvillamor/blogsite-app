from .user import UserBase, UserCreate, UserRead
from .token import TokenSchema, TokenPayload
from .blog import BlogBase, BlogCreate, PaginatedBlogs, BlogRead

UserRead.model_rebuild()
BlogRead.model_rebuild()