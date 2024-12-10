import { Filters, SortConfig } from './filters';
import { Item } from './item';

export interface AppState {
  items: Item[];
  filters: Filters;
  sort: SortConfig;
  isLoading: boolean;
  error: string | null;
}