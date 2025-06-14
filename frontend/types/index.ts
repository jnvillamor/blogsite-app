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

export interface Comment {
  id: number;
  content: string;
  author: User;
  blog_id: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: User;
  comments: Comment[];
  comment_count: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
  has_previous: boolean;
  next_page?: number;
  previous_page?: number;
  max_page: number;
}