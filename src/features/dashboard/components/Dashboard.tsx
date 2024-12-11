import { useEffect } from 'react';
import { useApp } from '@/shared/context';
import { mockItems } from '@/assets/data/mockData';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { DashboardFilters } from './DashboardFilters';
import { DashboardCharts } from './DashboardCharts';
import { ItemsTable } from './ItemsTable';
import { useItems } from '@/shared/hooks/useItems';

export const Dashboard = () => {
  const { state } = useApp();
  const { setItems } = useItems();

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