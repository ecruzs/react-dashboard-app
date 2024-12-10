import { useEffect } from 'react';
import { useAppContext } from '@/shared/context/useAppContext';
import { mockItems } from '@/assets/data/mockData';
import { DashboardHeader } from './DashboardHeader';
import { DashboardFilters } from './DashboardFilters';
import { ItemsTable } from './ItemsTable';
// import { DashboardCharts } from './DashboardCharts';

export const Dashboard = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    // Load mock data on initialization
    dispatch({ type: 'SET_ITEMS', payload: mockItems });
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardFilters />
      <div className="grid gap-6 lg:grid-cols-2">
        {/* TODO: DashboardCharts */}
        {/* <DashboardCharts /> */}
      </div>
      <ItemsTable />
    </div>
  );
};