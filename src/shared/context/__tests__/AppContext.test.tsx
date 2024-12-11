import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useItems } from '@/shared/hooks/useItems';
import { AppProvider } from '../app';
import { createTestItem } from '@/test/helpers';

describe('AppContext', () => {
  it('should provide initial items state', () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    expect(result.current.items).toEqual([]);
  });

  it('should add a new item', async () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const newItem = createTestItem();

    await act(async () => {
      await result.current.addItem(newItem);
    });

    expect(result.current.items).toContainEqual(newItem);
  });

  it('should remove an item', async () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const item = createTestItem();

    await act(async () => {
      await result.current.addItem(item);
    });

    await act(async () => {
      await result.current.deleteItem(item.id);
    });

    expect(result.current.items).not.toContainEqual(item);
  });

  it('should update an item', async () => {
    const { result } = renderHook(() => useItems(), {
      wrapper: AppProvider,
    });

    const item = createTestItem();
    const updatedItem = createTestItem({
      id: item.id,
      name: 'Updated Name',
      value: 200,
      status: 'inactive'
    });

    await act(async () => {
      await result.current.addItem(item);
    });

    await act(async () => {
      await result.current.updateItem(updatedItem);
    });

    expect(result.current.items).toContainEqual(updatedItem);
    expect(result.current.items).not.toContainEqual(item);
  });
});