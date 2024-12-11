import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardFilters } from '../DashboardFilters';
import { useItems } from '@/shared/hooks/useItems';
import { categories, statuses } from '@/assets/data/mockData';
import type { Filters } from '@/core/types/filters';

vi.mock('@/shared/hooks/useItems', () => ({
  useItems: vi.fn()
}));

describe('DashboardFilters', () => {
  const mockFilters: Filters = {
    search: '',
    category: '',
    status: ''
  };

  const mockSetFilters = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filters: mockFilters,
      setFilters: mockSetFilters
    });
  });

  it('renders all filter inputs with correct initial values', () => {
    render(<DashboardFilters />);

    const searchInput = screen.getByPlaceholderText('Search items...');
    const categorySelect = screen.getByLabelText(/category/i);
    const statusSelect = screen.getByLabelText(/status/i);

    expect(searchInput).toHaveValue('');
    expect(categorySelect).toHaveValue('');
    expect(statusSelect).toHaveValue('');
  });

  it('renders all category options', () => {
    render(<DashboardFilters />);

    const categorySelect = screen.getByLabelText(/category/i);
    const options = Array.from(categorySelect.getElementsByTagName('option'));

    expect(options).toHaveLength(categories.length + 1);
    expect(options[0]).toHaveValue(''); 
    
    categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('renders all status options', () => {
    render(<DashboardFilters />);

    const statusSelect = screen.getByLabelText(/status/i);
    const options = Array.from(statusSelect.getElementsByTagName('option'));

    expect(options).toHaveLength(statuses.length + 1); 
    expect(options[0]).toHaveValue(''); 

    statuses.forEach(status => {
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
      expect(screen.getByText(formattedStatus)).toBeInTheDocument();
    });
  });

  it('handles search input change with single event', () => {
    render(<DashboardFilters />);
    const searchInput = screen.getByPlaceholderText('Search items...');
    
    fireEvent.change(searchInput, { 
      target: { 
        name: 'search', 
        value: 'test search' 
      } 
    });

    expect(mockSetFilters).toHaveBeenCalledWith({
      ...mockFilters,
      search: 'test search'
    });
  });

  it('handles category selection change', () => {
    render(<DashboardFilters />);
    const categorySelect = screen.getByLabelText(/category/i);
    
    fireEvent.change(categorySelect, { 
      target: { name: 'category', value: categories[0] } 
    });

    expect(mockSetFilters).toHaveBeenCalledWith({
      ...mockFilters,
      category: categories[0]
    });
  });

  it('handles status selection change', () => {
    render(<DashboardFilters />);
    const statusSelect = screen.getByLabelText(/status/i);
    
    fireEvent.change(statusSelect, { 
      target: { name: 'status', value: statuses[0] } 
    });

    expect(mockSetFilters).toHaveBeenCalledWith({
      ...mockFilters,
      status: statuses[0]
    });
  });

  it('renders filters with pre-existing values', () => {
    const existingFilters: Filters = {
      search: 'existing search',
      category: categories[0],
      status: statuses[0]
    };

    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filters: existingFilters,
      setFilters: mockSetFilters
    });

    render(<DashboardFilters />);

    expect(screen.getByPlaceholderText('Search items...')).toHaveValue('existing search');
    expect(screen.getByLabelText(/category/i)).toHaveValue(categories[0]);
    expect(screen.getByLabelText(/status/i)).toHaveValue(statuses[0]);
  });

  it('maintains other filter values when changing one filter', async () => {
    const existingFilters: Filters = {
      search: 'existing search',
      category: categories[0],
      status: statuses[0]
    };

    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filters: existingFilters,
      setFilters: mockSetFilters
    });

    render(<DashboardFilters />);
    
    const categorySelect = screen.getByLabelText(/category/i);
    fireEvent.change(categorySelect, { 
      target: { name: 'category', value: categories[1] } 
    });

    expect(mockSetFilters).toHaveBeenCalledWith({
      search: 'existing search',
      category: categories[1],
      status: statuses[0]
    });
  });
});