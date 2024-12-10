export interface Item {
  id: string;
  name: string;
  category: string;
  value: number;
  status: 'active' | 'inactive';
  createdAt: string;
  description?: string;
}