import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardStats } from '../DashboardStats';
import { useItems } from '@/shared/hooks/useItems';
import type { Item } from '@/core/types/item';

vi.mock('@/shared/hooks/useItems', () => ({
  useItems: vi.fn()
}));

describe('DashboardStats', () => {
  const mockItems: Item[] = [
    {
      id: '1',
      name: 'Item 1',
      category: 'Category A',
      value: 100,
      status: 'active',
      createdAt: '2024-01-01',
      description: 'Test description 1'
    },
    {
      id: '2',
      name: 'Item 2',
      category: 'Category B',
      value: 200,
      status: 'active',
      createdAt: '2024-01-02',
      description: 'Test description 2'
    },
    {
      id: '3',
      name: 'Item 3',
      category: 'Category A',
      value: 300,
      status: 'inactive',
      createdAt: '2024-01-03',
      description: 'Test description 3'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: mockItems
    });
  });

  it('renders all stat cards', () => {
    render(<DashboardStats />);

    expect(screen.getByText('Total Items')).toBeInTheDocument();
    expect(screen.getByText('Total Value')).toBeInTheDocument();
    expect(screen.getByText('Active Items')).toBeInTheDocument();
    expect(screen.getByText('Average Value')).toBeInTheDocument();
  });

  it('calculates and displays total items correctly', () => {
    render(<DashboardStats />);
    
    const totalItems = screen.getByText('3');
    expect(totalItems).toBeInTheDocument();
  });

  it('calculates and displays active items correctly', () => {
    render(<DashboardStats />);
    
    const activeItems = screen.getByText('2');
    expect(activeItems).toBeInTheDocument();
  });

  it('calculates and displays total value correctly', () => {
    render(<DashboardStats />);
    
    const totalValue = screen.getByText('$600.00');
    expect(totalValue).toBeInTheDocument();
  });

  it('calculates and displays average value correctly', () => {
    render(<DashboardStats />);
    
    const avgValue = screen.getByText('$200.00');
    expect(avgValue).toBeInTheDocument();
  });

  it('maintains consistent card layout and styling', () => {
    render(<DashboardStats />);
    
    const cards = screen.getAllByRole('generic').filter(
      element => element.className.includes('rounded-xl')
    );
    
    expect(cards).toHaveLength(4); 
    
    cards.forEach(card => {
      expect(card).toHaveClass('bg-white', 'p-6', 'shadow-sm');
      expect(card.querySelector('svg')).toBeInTheDocument();
      expect(card.querySelector('.text-2xl')).toBeInTheDocument();
      expect(card.querySelector('.text-sm')).toBeInTheDocument();
    });
  });
});