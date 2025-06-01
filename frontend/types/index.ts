export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
  blogs: BlogPost[];
  blog_count: number;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
  next?: number;
  prev?: number;
  max_page: number;
}