export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface DashboardProps {
  initialData: Post[];
  error?: string;
}
