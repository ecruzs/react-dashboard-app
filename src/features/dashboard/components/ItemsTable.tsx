import { useNavigate } from 'react-router-dom';
import { useItems } from '@/shared/hooks/useItems';
import { Item } from '@/core/types';

/**
 * Displays items in a sortable table format with the following features:
 * - Clickable headers for sorting
 * - Row click navigation to detail view
 * - Formatted currency and dates
 * - Status indicators with appropriate styling
 */
export const ItemsTable = () => {
  const { filteredItems, sort, setSort } = useItems();
  const navigate = useNavigate();

  /**
   * Handles column sorting with toggle between ascending and descending order.
   * If clicking the same column, toggles direction.
   * If clicking a new column, defaults to ascending order.
   */
  const handleSort = (field: keyof Item) => {
    setSort({
      field,
      direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  /**
   * Renders sort direction indicator based on current sort state
   */
  const SortIndicator = ({ field }: { field: keyof Item }) => {
    if (sort.field !== field) {
      return (
        <span className="ml-1 text-gray-400">↕</span>
      );
    }
    return (
      <span className="ml-1 text-gray-900">
        {sort.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name
                <SortIndicator field="name" />
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
              onClick={() => handleSort('category')}
            >
              <div className="flex items-center">
                Category
                <SortIndicator field="category" />
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
              onClick={() => handleSort('value')}
            >
              <div className="flex items-center">
                Value
                <SortIndicator field="value" />
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status
                <SortIndicator field="status" />
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
              onClick={() => handleSort('createdAt')}
            >
              <div className="flex items-center">
                Created At
                <SortIndicator field="createdAt" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredItems.map((item) => (
            <tr
              key={item.id}
              onClick={() => navigate(`/details/${item.id}`)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{formatCurrency(item.value)}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  item.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};