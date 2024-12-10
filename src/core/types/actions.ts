import { Filters, SortConfig } from "./filters";
import { Item } from "./item";

export type AppAction =
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'SET_FILTERS'; payload: Filters }
  | { type: 'SET_SORT'; payload: SortConfig }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };