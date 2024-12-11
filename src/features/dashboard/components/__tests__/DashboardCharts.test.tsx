import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardCharts } from '../DashboardCharts';
import { useItems } from '@/shared/hooks/useItems';
import type { Item } from '@/core/types/item';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

vi.mock('recharts', () => ({
  ResponsiveContainer: vi.fn(({ children }) => children),
  BarChart: vi.fn(({ children }) => (
    <div data-testid="bar-chart">
      {children}
    </div>
  )),
  PieChart: vi.fn(({ children }) => (
    <div data-testid="pie-chart">
      {children}
    </div>
  )),
  Bar: vi.fn(props => <div data-testid="bar" {...props} />),
  Pie: vi.fn(props => <div data-testid="pie" {...props} />),
  Cell: vi.fn(props => <div data-testid="cell" {...props} />),
  XAxis: vi.fn(props => <div data-testid="x-axis" {...props} />),
  YAxis: vi.fn(props => <div data-testid="y-axis" {...props} />),
  CartesianGrid: vi.fn(props => <div data-testid="cartesian-grid" {...props} />),
  Tooltip: vi.fn(props => <div data-testid="tooltip" {...props} />),
  Legend: vi.fn(props => <div data-testid="legend" {...props} />)
}));

vi.mock('@/shared/hooks/useItems', () => ({
  useItems: vi.fn()
}));

describe('DashboardCharts', () => {
  const mockItems: Item[] = [
    {
      id: '1',
      name: 'Item 1',
      category: 'Category A',
      value: 100,
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Item 2',
      category: 'Category A',
      value: 150,
      status: 'active',
      createdAt: '2024-01-02'
    },
    {
      id: '3',
      name: 'Item 3',
      category: 'Category B',
      value: 200,
      status: 'inactive',
      createdAt: '2024-01-03'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: mockItems
    });
  });

  it('renders both charts with titles', () => {
    render(<DashboardCharts />);
    
    expect(screen.getByText('Value by Category')).toBeInTheDocument();
    expect(screen.getByText('Items by Status')).toBeInTheDocument();
  });

  it('renders bar chart with correct data', () => {
    render(<DashboardCharts />);
    
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('bar')).toBeInTheDocument();
  });

  it('renders pie chart with correct data', () => {
    render(<DashboardCharts />);
    
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
    expect(screen.getAllByTestId('cell')).toHaveLength(2);
  });

  it('handles empty items array', () => {
    (useItems as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      items: []
    });

    render(<DashboardCharts />);
    
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });
});