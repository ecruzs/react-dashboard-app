import { useParams, useNavigate } from 'react-router-dom';
import { useItems } from '@/shared/hooks/useItems';
import { ItemActions } from './ItemActions';
import { ItemDetails } from './ItemDetails';

/**
 * Details page component that handles item display and routing.
 * Manages the layout for both item details and actions.
 * Includes error handling for non-existent items.
 */
export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useItems();

  const item = items.find(item => item.id === id);

  if (!item) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Item not found</h2>
        <p className="mt-3 text-gray-500">The requested item could not be found.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Return to Dashboard
        </button>
      </div>
    );
  }

  /**
   * Layout structure:
   * - Header with back navigation
   * - Two-column grid on larger screens:
   *   - Main content (2/3 width): Item details
   *   - Sidebar (1/3 width): Quick actions
   */
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Item Details</h1>
        </div>
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