import { useItems } from '@/shared/hooks/useItems';
import { categories, statuses } from '@/assets/data/mockData';

/**
 * Provides filtering capabilities for the dashboard.
 * Includes:
 * - Text search across items
 * - Category filter dropdown
 * - Status filter dropdown
 * 
 * All filters are controlled through the useItems hook for centralized state management.
 */
export const DashboardFilters = () => {
  const { filters, setFilters } = useItems();

  /**
   * Generic handler for all filter changes.
   * Updates the filter state while preserving other existing filters.
   */
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search
          </label>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={filters.search}
              onChange={handleFilterChange}
              className="block w-full rounded-lg border border-gray-200 bg-white pl-10 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-blue-500"
              placeholder="Search items..."
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};