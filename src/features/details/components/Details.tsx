import { useParams, useNavigate } from 'react-router-dom';
import { useItems } from '@/shared/hooks/useItems';
import { ItemDetails } from './ItemDetails';
import { ItemActions } from './ItemActions';

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useItems();

  const item = items.find(item => item.id === id);

  if (!item) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow">
        <h2 className="text-xl font-semibold text-gray-900">Item not found</h2>
        <p className="mt-2 text-gray-500">The requested item could not be found.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Item Details</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ItemDetails item={item} />
        </div>
        <div>
          <ItemActions item={item} />
        </div>
      </div>
    </div>
  );
};