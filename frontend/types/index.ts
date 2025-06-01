export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  full_name: string;
}

export interface BlogPost {
  id: string;
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
}