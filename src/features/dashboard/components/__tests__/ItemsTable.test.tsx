import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { ItemsTable } from '../ItemsTable';
import { useItems } from '@/shared/hooks/useItems';
import type { Item } from '@/core/types/item';
import type { SortConfig } from '@/core/types/filters';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@/shared/hooks/useItems', () => ({
  useItems: vi.fn()
}));

describe('ItemsTable', () => {
  const mockNavigate = vi.fn();
  const mockSetSort = vi.fn();

  const mockItems: Item[] = [
    {
      id: '1',
      name: 'Item A',
      category: 'Category 1',
      value: 100,
      status: 'active',
      createdAt: '2024-01-01T00:00:00.000Z',
      description: 'Description A'
    },
    {
      id: '2',
      name: 'Item B',
      category: 'Category 2',
      value: 200,
      status: 'inactive',
      createdAt: '2024-01-02T00:00:00.000Z',
      description: 'Description B'
    }
  ];

  const mockSort: SortConfig = {
    field: 'name',
    direction: 'asc'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filteredItems: mockItems,
      sort: mockSort,
      setSort: mockSetSort
    });
  });

  it('renders table headers correctly', () => {
    render(<ItemsTable />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Created At')).toBeInTheDocument();
  });

  it('renders item data correctly', () => {
    render(<ItemsTable />);
    
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('1/1/2024')).toBeInTheDocument();
  });

  it('handles sort when clicking column headers', () => {
    render(<ItemsTable />);
    
    fireEvent.click(screen.getByText('Name'));
    
    expect(mockSetSort).toHaveBeenCalledWith({
      field: 'name',
      direction: 'desc'
    });
  });

  it('navigates to detail view when clicking a row', () => {
    render(<ItemsTable />);
    
    fireEvent.click(screen.getByText('Item A'));
    
    expect(mockNavigate).toHaveBeenCalledWith('/details/1');
  });

  it('displays correct sort indicators', () => {
    render(<ItemsTable />);
    
    const nameHeader = screen.getByText('Name').parentElement;
    expect(nameHeader).toContainHTML('↑');
    
    const categoryHeader = screen.getByText('Category').parentElement;
    expect(categoryHeader).toContainHTML('↕');
  });

  it('formats currency values correctly', () => {
    render(<ItemsTable />);
    
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filteredItems: [],
      sort: mockSort,
      setSort: mockSetSort
    });

    render(<ItemsTable />);
    
    const headers = screen.getByRole('row');
    expect(headers).toBeInTheDocument(); 
    expect(screen.queryByRole('cell')).not.toBeInTheDocument();
  });

});