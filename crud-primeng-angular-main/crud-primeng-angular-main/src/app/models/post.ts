export interface Post {
  id: number;
  author: string;
  content: string;
  image?: string;
  created_at: string;
  likes_count: number;
}