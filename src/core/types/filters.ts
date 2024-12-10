import { Item } from "./item";

export interface Filters {
  search: string;
  category: string;
  status: string;
}

export interface SortConfig {
  field: keyof Item;
  direction: 'asc' | 'desc';
}