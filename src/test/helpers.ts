import { Item } from "@/core/types";

export const createTestItem = (override: Partial<Item> = {}): Item => {
  const defaultItem: Item = {
    id: String(Math.random()),
    name: 'Test Item',
    category: 'Test Category',
    value: 100,
    status: 'active' as const,
    createdAt: new Date().toISOString(),
    description: 'Test Description',
    ...override
  };
  return defaultItem;
};