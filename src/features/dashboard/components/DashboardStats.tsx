import { useItems } from '@/shared/hooks/useItems';

/**
 * Displays key metrics in card format:
 * - Total number of items
 * - Total value of all items
 * - Number of active items
 * - Average value per item
 * 
 * Each metric is accompanied by an icon and uses consistent formatting.
 */
export const DashboardStats = () => {
  const { items } = useItems();

  /**
   * Calculates dashboard statistics from items data.
   * Uses reduce for efficient calculation of totals and averages.
   */
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
      <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center">
          <div className="rounded-lg bg-blue-50 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-800">{stats.totalItems}</p>
        <p className="text-sm font-medium text-gray-500">Total Items</p>
      </div>
      
      <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center">
          <div className="rounded-lg bg-indigo-50 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(stats.totalValue)}
        </p>
        <p className="text-sm font-medium text-gray-500">Total Value</p>
      </div>
      
      <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center">
          <div className="rounded-lg bg-green-50 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-800">{stats.activeItems}</p>
        <p className="text-sm font-medium text-gray-500">Active Items</p>
      </div>
      
      <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center">
          <div className="rounded-lg bg-purple-50 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(stats.avgValue)}
        </p>
        <p className="text-sm font-medium text-gray-500">Average Value</p>
      </div>
    </div>
  );
};