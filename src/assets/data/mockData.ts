import { Item } from '@/core/types/item';

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Product Analysis Report',
    category: 'Reports',
    value: 1500,
    status: 'active',
    createdAt: '2024-01-15T08:00:00.000Z',
    description: 'Detailed analysis of Q4 2023 product performance'
  },
  {
    id: '2',
    name: 'Marketing Campaign',
    category: 'Marketing',
    value: 2500,
    status: 'active',
    createdAt: '2024-02-01T10:30:00.000Z',
    description: 'Spring 2024 digital marketing campaign'
  },
  {
    id: '3',
    name: 'Software License',
    category: 'IT',
    value: 800,
    status: 'inactive',
    createdAt: '2024-01-20T15:45:00.000Z',
    description: 'Annual software license renewal'
  },
  {
    id: '4',
    name: 'Office Supplies',
    category: 'Supplies',
    value: 350,
    status: 'active',
    createdAt: '2024-02-10T09:15:00.000Z',
    description: 'Monthly office supplies and equipment'
  },
  {
    id: '5',
    name: 'Training Program',
    category: 'HR',
    value: 1200,
    status: 'active',
    createdAt: '2024-02-15T11:20:00.000Z',
    description: 'Employee development program'
  }
];

export const categories = ['Reports', 'Marketing', 'IT', 'Supplies', 'HR'];
export const statuses = ['active', 'inactive'];