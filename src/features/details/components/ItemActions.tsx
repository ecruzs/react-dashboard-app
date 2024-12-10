import { useNavigate } from 'react-router-dom';
import { useItems } from '@/shared/hooks/useItems';
import { Item } from '@/core/types/item';

interface ItemActionsProps {
  item: Item;
}

export const ItemActions = ({ item }: ItemActionsProps) => {
  const navigate = useNavigate();
  const { deleteItem } = useItems();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(item.id);
      navigate('/dashboard');
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="text-lg font-medium text-gray-900">Actions</h3>
      
      <div className="mt-4 space-y-3">
        <button
          onClick={handleDelete}
          className="flex w-full items-center justify-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};