import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useItems } from '@/shared/hooks/useItems';
import { AppProvider } from '@/shared/context/app';
import { createTestItem } from '@/test/helpers';

describe('useItems Hook', () => {
  it('should start with empty state', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.filteredItems).toEqual([]);
  });

  it('should set and get items', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const items = [
      createTestItem({ id: '1', name: 'Item 1' }),
      createTestItem({ id: '2', name: 'Item 2' })
    ];

    act(() => {
      result.current.setItems(items);
    });

    expect(result.current.items).toHaveLength(items.length);
    items.forEach(item => {
      expect(result.current.items).toContainEqual(expect.objectContaining({
        id: item.id,
        name: item.name,
        category: item.category,
        value: item.value,
        status: item.status
      }));
    });

    expect(result.current.filteredItems).toHaveLength(items.length);
    items.forEach(item => {
      expect(result.current.filteredItems).toContainEqual(expect.objectContaining({
        id: item.id,
        name: item.name,
        category: item.category,
        value: item.value,
        status: item.status
      }));
    });
  });

  it('should add item', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const newItem = createTestItem({ name: 'New Item' });

    act(() => {
      result.current.addItem(newItem);
    });

    expect(result.current.items).toContainEqual(newItem);
    expect(result.current.filteredItems).toContainEqual(newItem);
  });

  it('should update item', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const initialItem = createTestItem({ name: 'Initial Item' });
    act(() => {
      result.current.addItem(initialItem);
    });

    const updatedItem = { ...initialItem, name: 'Updated Item' };
    act(() => {
      result.current.updateItem(updatedItem);
    });

    expect(result.current.items[0].name).toBe('Updated Item');
    expect(result.current.filteredItems[0].name).toBe('Updated Item');
  });

  it('should delete item', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const item = createTestItem();
    act(() => {
      result.current.addItem(item);
    });

    act(() => {
      result.current.deleteItem(item.id);
    });

    expect(result.current.items).not.toContainEqual(item);
    expect(result.current.filteredItems).not.toContainEqual(item);
  });

  it('should filter items by search term', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const items = [
      createTestItem({ name: 'Apple' }),
      createTestItem({ name: 'Banana' }),
      createTestItem({ name: 'Apple Pie' })
    ];

    act(() => {
      result.current.setItems(items);
      result.current.setFilters({
        search: 'apple',
        category: '',
        status: ''
      });
    });

    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems.every(item =>
      item.name.toLowerCase().includes('apple')
    )).toBe(true);
  });

  it('should filter items by category', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const items = [
      createTestItem({ category: 'A', name: 'Item 1' }),
      createTestItem({ category: 'B', name: 'Item 2' }),
      createTestItem({ category: 'A', name: 'Item 3' })
    ];

    act(() => {
      result.current.setItems(items);
      result.current.setFilters({
        search: '',
        category: 'A',
        status: ''
      });
    });

    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems.every(item => item.category === 'A')).toBe(true);
  });

  it('should filter items by status', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const items = [
      createTestItem({ status: 'active', name: 'Item 1' }),
      createTestItem({ status: 'inactive', name: 'Item 2' }),
      createTestItem({ status: 'active', name: 'Item 3' })
    ];

    act(() => {
      result.current.setItems(items);
      result.current.setFilters({
        search: '',
        category: '',
        status: 'active'
      });
    });

    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems.every(item => item.status === 'active')).toBe(true);
  });

  it('should sort items', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const items = [
      createTestItem({ name: 'C', value: 100 }),
      createTestItem({ name: 'A', value: 300 }),
      createTestItem({ name: 'B', value: 200 })
    ];

    act(() => {
      result.current.setItems(items);
      result.current.setSort({
        field: 'name',
        direction: 'asc'
      });
    });

    expect(result.current.filteredItems[0].name).toBe('A');
    expect(result.current.filteredItems[2].name).toBe('C');

    act(() => {
      result.current.setSort({
        field: 'value',
        direction: 'desc'
      });
    });

    expect(result.current.filteredItems[0].value).toBe(300);
    expect(result.current.filteredItems[2].value).toBe(100);
  });

  it('should combine filters and sort', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const items = [
      createTestItem({ name: 'A', category: 'cat1', status: 'active', value: 100 }),
      createTestItem({ name: 'B', category: 'cat2', status: 'inactive', value: 200 }),
      createTestItem({ name: 'C', category: 'cat1', status: 'active', value: 300 })
    ];

    act(() => {
      result.current.setItems(items);
      result.current.setFilters({
        search: '',
        category: 'cat1',
        status: 'active'
      });
      result.current.setSort({
        field: 'value',
        direction: 'desc'
      });
    });

    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems[0].value).toBe(300);
    expect(result.current.filteredItems[1].value).toBe(100);
  });
});