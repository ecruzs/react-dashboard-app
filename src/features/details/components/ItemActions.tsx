import { useNavigate } from 'react-router-dom';
import { useItems } from '@/shared/hooks/useItems';
import { Item } from '@/core/types/item';

interface ItemActionsProps {
  item: Item;
}

export const ItemActions = ({ item }: ItemActionsProps) => {
  const navigate = useNavigate();
  const { deleteItem, updateItem } = useItems();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(item.id);
      navigate('/dashboard');
    }
  };

  const handleStatusToggle = () => {
    updateItem({
      ...item,
      status: item.status === 'active' ? 'inactive' : 'active'
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="font-medium text-gray-900">Quick Actions</h3>
      
      <div className="mt-4 space-y-3">
        <button
          onClick={handleStatusToggle}
          className={`flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
            item.status === 'active'
              ? 'border-red-200 bg-white text-red-600 hover:bg-red-50'
              : 'border-green-200 bg-white text-green-600 hover:bg-green-50'
          }`}
        >
          {item.status === 'active' ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Deactivate Item
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Activate Item
            </>
          )}
        </button>
        
        <button
          onClick={handleDelete}
          className="flex w-full items-center justify-center rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Item
        </button>
      </div>
    </div>
  );
};