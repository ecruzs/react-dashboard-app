import { useAppContext } from '@/shared/context/useAppContext';
import { Item } from '@/core/types/item';
import { Filters } from '@/core/types/filters';
import { SortConfig } from '@/core/types/filters';
import { useCallback, useMemo } from 'react';

export function useItems() {
  const { state, dispatch } = useAppContext();

  const setItems = useCallback((items: Item[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  }, [dispatch]);

  const addItem = useCallback((item: Item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, [dispatch]);

  const updateItem = useCallback((item: Item) => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
  }, [dispatch]);

  const deleteItem = useCallback((id: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  }, [dispatch]);

  const setFilters = useCallback((filters: Filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, [dispatch]);

  const setSort = useCallback((sort: SortConfig) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  }, [dispatch]);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...state.items];

    const { search, category, status } = state.filters;
    const { field, direction } = state.sort;

    // Apply all filters in one iteration 
    if (search || category || status) {
      const searchLower = search.toLowerCase();
      result = result.filter(item => {
        const matchesSearch = !search || item.name.toLowerCase().includes(searchLower);
        const matchesCategory = !category || item.category === category;
        const matchesStatus = !status || item.status === status;
        return matchesSearch && matchesCategory && matchesStatus;
      });
    }

    // Optimize sorting
    const sortDirection = direction === 'asc' ? 1 : -1;
    return result.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue === undefined || bValue === undefined) return 0;
      return aValue > bValue ? sortDirection : -sortDirection;
    });
  }, [state.items, state.filters, state.sort]);

  return {
    items: state.items,
    filteredItems: filteredAndSortedItems,
    filters: state.filters,
    sort: state.sort,
    isLoading: state.isLoading,
    error: state.error,
    setItems,
    addItem,
    updateItem,
    deleteItem,
    setFilters,
    setSort,
  };
}