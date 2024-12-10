import { useItems } from '@/shared/hooks/useItems';

export const DashboardStats = () => {
  const { items } = useItems();

  const stats = {
    totalItems: items.length,
    totalValue: items.reduce((sum, item) => sum + item.value, 0),
    activeItems: items.filter(item => item.status === 'active').length,
    avgValue: items.length > 0 
      ? items.reduce((sum, item) => sum + item.value, 0) / items.length 
      : 0
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <h4 className="text-sm font-medium text-gray-500">Total Items</h4>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{stats.totalItems}</p>
      </div>
      
      <div className="rounded-lg bg-white p-4 shadow">
        <h4 className="text-sm font-medium text-gray-500">Total Value</h4>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(stats.totalValue)}
        </p>
      </div>
      
      <div className="rounded-lg bg-white p-4 shadow">
        <h4 className="text-sm font-medium text-gray-500">Active Items</h4>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{stats.activeItems}</p>
      </div>
      
      <div className="rounded-lg bg-white p-4 shadow">
        <h4 className="text-sm font-medium text-gray-500">Average Value</h4>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(stats.avgValue)}
        </p>
      </div>
    </div>
  );
};