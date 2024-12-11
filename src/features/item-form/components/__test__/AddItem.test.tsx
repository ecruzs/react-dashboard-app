import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { AddItem } from '../AddItem';
import { useItems } from '@/shared/hooks/useItems';
import { useNotification } from '@/shared/context';
import { useNavigate } from 'react-router-dom';
import { Filters, Item, NotificationContextType, SortConfig } from '@/core/types';

vi.mock('@/shared/hooks/useItems');
vi.mock('@/shared/context');
vi.mock('react-router-dom');

export interface UseItemsType {
  items: Item[];
  filteredItems: Item[];
  filters: Filters;
  sort: SortConfig;
  isLoading: boolean;
  error: string | null;
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => Promise<void>;
  updateItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  setFilters: (filters: Filters) => void;
  setSort: (sort: SortConfig) => void;
}

describe('AddItem', () => {
  const mockNavigate = vi.fn();
  const mockAddItem = vi.fn();
  const mockShowNotification = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useItems).mockReturnValue({
      items: [],
      filteredItems: [],
      filters: { search: '', category: '', status: '' },
      sort: { field: 'name', direction: 'asc' },
      isLoading: false,
      error: null,
      setItems: vi.fn(),
      addItem: mockAddItem,
      updateItem: vi.fn(),
      deleteItem: vi.fn(),
      setFilters: vi.fn(),
      setSort: vi.fn(),
    } as UseItemsType);
    vi.mocked(useNotification).mockReturnValue({
      showNotification: mockShowNotification,
      notification: null,
    } as NotificationContextType);

    vi.spyOn(crypto, 'randomUUID').mockReturnValue('123e4567-e89b-12d3-a456-426614174000');
  });

  test('renders form with all required fields', () => {
    render(<AddItem />);

    expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/value \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(<AddItem />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /create item/i }));

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a valid category/i)).toBeInTheDocument();
    });
  });

  test('successfully submits form with valid data', async () => {
    render(<AddItem />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name \*/i), 'Test Item');
    await user.selectOptions(screen.getByLabelText(/category \*/i), 'Reports');
    await user.type(screen.getByLabelText(/value \*/i), '100');
    await user.selectOptions(screen.getByLabelText(/status \*/i), 'active');
    await user.type(screen.getByLabelText(/description/i), 'Test description for the item');

    await user.click(screen.getByRole('button', { name: /create item/i }));

    await waitFor(() => {
      expect(mockAddItem).toHaveBeenCalledWith({
        id: '123e4567-e89b-12d3-a456-426614174000', // Cambiar el valor esperado al UUID mockeado
        name: 'Test Item',
        category: 'Reports',
        value: 100,
        status: 'active',
        description: 'Test description for the item',
        createdAt: expect.any(String)
      });

      expect(mockShowNotification).toHaveBeenCalledWith({
        message: 'Item created successfully',
        type: 'success'
      });

      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('handles API errors appropriately', async () => {
    const errorMessage = 'Failed to create item';
    mockAddItem.mockRejectedValueOnce(new Error(errorMessage));

    render(<AddItem />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name \*/i), 'Test Item');
    await user.selectOptions(screen.getByLabelText(/category \*/i), 'Reports');
    await user.type(screen.getByLabelText(/value \*/i), '100');
    await user.type(screen.getByLabelText(/description/i), 'Test description for the item');

    await user.click(screen.getByRole('button', { name: /create item/i }));

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        message: errorMessage,
        type: 'error'
      });
    });
  });

  test('navigates back on cancel', async () => {
    render(<AddItem />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('validates numeric value input', async () => {
    render(<AddItem />);
    const user = userEvent.setup();

    const valueInput = screen.getByLabelText(/value \*/i);
    await user.type(valueInput, '-100');

    await user.click(screen.getByRole('button', { name: /create item/i }));

    await waitFor(() => {
      expect(screen.getByText(/expected number, received nan/i)).toBeInTheDocument();
    });
  });
});