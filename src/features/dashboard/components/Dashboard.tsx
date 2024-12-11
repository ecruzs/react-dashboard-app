import { useEffect } from 'react';
import { useApp } from '@/shared/context';
import { mockItems } from '@/assets/data/mockData';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { DashboardFilters } from './DashboardFilters';
import { DashboardCharts } from './DashboardCharts';
import { ItemsTable } from './ItemsTable';
import { useItems } from '@/shared/hooks/useItems';

/**
 * Main Dashboard component that orchestrates the display of various dashboard sections.
 * Implements a data-driven architecture where all child components receive data through
 * the useItems hook for consistent state management.
 */
export const Dashboard = () => {
  const { state } = useApp();
  const { setItems } = useItems();

  /**
   * Initialize dashboard with mock data if no items exist.
   * This ensures the dashboard always has data to display during development
   * and can be easily replaced with real API calls in production.
   */
  useEffect(() => {
    if (state.items.length === 0) {
      setItems(mockItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats />
      <DashboardFilters />
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCharts />
      </div>
      <ItemsTable />
    </div>
  );
};