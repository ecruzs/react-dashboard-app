import { useAppContext } from '@/shared/context/useAppContext';
import { Item } from '@/core/types/item';
import { Filters } from '@/core/types/filters';
import { SortConfig } from '@/core/types/filters';

export function useItems() {
  const { state, dispatch } = useAppContext();

  const addItem = (item: Item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateItem = (item: Item) => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
  };

  const deleteItem = (id: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };

  const setFilters = (filters: Filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setSort = (sort: SortConfig) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const filteredAndSortedItems = () => {
    let result = [...state.items];

    // Apply filters
    if (state.filters.search) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(state.filters.search.toLowerCase())
      );
    }
    if (state.filters.category) {
      result = result.filter(item => item.category === state.filters.category);
    }
    if (state.filters.status) {
      result = result.filter(item => item.status === state.filters.status);
    }

    // Apply order
    result.sort((a, b) => {
      const field = state.sort.field;
      const aValue = a[field];
      const bValue = b[field];

      if (aValue === undefined || bValue === undefined) return 0;

      const direction = state.sort.direction === 'asc' ? 1 : -1;
      return aValue > bValue ? direction : -direction;
    });

    return result;
  };

  return {
    items: state.items,
    filteredItems: filteredAndSortedItems(),
    filters: state.filters,
    sort: state.sort,
    isLoading: state.isLoading,
    error: state.error,
    addItem,
    updateItem,
    deleteItem,
    setFilters,
    setSort,
  };
}