import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard';
import { useItems } from '@/shared/hooks/useItems';
import { useApp } from '@/shared/context';
import { mockItems } from '@/assets/data/mockData';
import type { AppState } from '@/core/types/state';
import type { Filters, SortConfig } from '@/core/types/filters';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

vi.mock('recharts', () => ({
  ResponsiveContainer: vi.fn(({ children }) => children),
  BarChart: vi.fn(() => null),
  Bar: vi.fn(),
  XAxis: vi.fn(),
  YAxis: vi.fn(),
  CartesianGrid: vi.fn(),
  Tooltip: vi.fn(),
  PieChart: vi.fn(() => null),
  Pie: vi.fn(),
  Cell: vi.fn(),
  Legend: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('@/shared/hooks/useItems', () => ({
  useItems: vi.fn()
}));

vi.mock('@/shared/context', () => ({
  useApp: vi.fn()
}));

describe('Dashboard', () => {
  const mockState: AppState = {
    items: mockItems,
    filters: {
      search: '',
      category: '',
      status: ''
    } as Filters,
    sort: {
      field: 'name',
      direction: 'asc'
    } as SortConfig,
    isLoading: false,
    error: null
  };

  const mockItemsHook = {
    items: mockItems,
    filteredItems: mockItems,
    setItems: vi.fn(),
    filters: mockState.filters,
    setFilters: vi.fn(),
    sort: mockState.sort,
    setSort: vi.fn()
  };

  beforeEach(() => {
    vi.resetAllMocks();
    
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: mockState,
      dispatch: vi.fn()
    });

    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockItemsHook);
  });

  it('renders dashboard with all components when items exist', () => {
    render(<Dashboard />);
    
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Total Items')).toBeInTheDocument();
    expect(screen.getByText('Total Value')).toBeInTheDocument();
    expect(screen.getByText('Active Items')).toBeInTheDocument();
    expect(screen.getByText('Average Value')).toBeInTheDocument();
    
    expect(document.querySelector('.space-y-6')).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /status/i })).toBeInTheDocument();
  });

  it('shows loading state when no items exist', () => {
    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { ...mockState, items: [] },
      dispatch: vi.fn()
    });

    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('calls setItems with mockItems when items array is empty', () => {
    const setItemsMock = vi.fn();
    
    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...mockItemsHook,
      setItems: setItemsMock
    });

    (useApp as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { ...mockState, items: [] },
      dispatch: vi.fn()
    });

    render(<Dashboard />);
    expect(setItemsMock).toHaveBeenCalledWith(mockItems);
  });
});