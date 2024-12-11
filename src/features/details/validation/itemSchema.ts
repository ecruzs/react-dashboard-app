import { z } from 'zod';
import { categories, statuses } from '@/assets/data/mockData';

export const itemSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  category: z.enum(categories as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  value: z.number()
    .min(0, 'Value must be greater than or equal to 0')
    .max(1000000, 'Value must be less than 1,000,000'),
  status: z.enum(statuses, {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .optional(),
});

export type ItemFormData = z.infer<typeof itemSchema>;