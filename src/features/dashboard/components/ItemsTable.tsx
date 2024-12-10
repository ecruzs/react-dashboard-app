import { useNavigate } from 'react-router-dom';
import { useItems } from '@/shared/hooks/useItems';
import { Item } from '@/core/types/item';

export const ItemsTable = () => {
  const { filteredItems, sort, setSort } = useItems();
  const navigate = useNavigate();

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

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => handleSort('name')}
            >
              Name
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => handleSort('category')}
            >
              Category
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => handleSort('value')}
            >
              Value
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => handleSort('status')}
            >
              Status
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              onClick={() => handleSort('createdAt')}
            >
              Created At
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
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${item.status === 'active'
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