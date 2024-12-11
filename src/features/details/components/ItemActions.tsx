import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '@/shared/hooks/useItems';
import { Item } from '@/core/types/item';
import { useNotification } from '@/shared/context';
import { ConfirmationModal } from '@/shared/components/modals/ConfirmationModal';

interface ItemActionsProps {
  item: Item;
}

/**
 * Component for handling item-related actions like status toggle and deletion.
 * Implements:
 * - Status toggle between active/inactive
 * - Item deletion with confirmation
 * - Error handling with notifications
 */
export const ItemActions = ({ item }: ItemActionsProps) => {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const { deleteItem, updateItem } = useItems();
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles item deletion with error handling and navigation.
   * Shows success/error notifications and redirects to dashboard on success.
   */
  const handleDelete = async () => {
    try {
      await deleteItem(item.id);
      showNotification({
        message: 'Item deleted successfully',
        type: 'success'
      });
      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to delete item. Please try again.';
      showNotification({
        message: errorMessage,
        type: 'error'
      });
    }
  };

  /**
   * Toggles item status between active/inactive.
   * Updates item state and shows appropriate notification.
   */
  const handleStatusToggle = async () => {
    try {
      await updateItem({
        ...item,
        status: item.status === 'active' ? 'inactive' : 'active'
      });

      showNotification({
        message: `Item ${item.status === 'active' ? 'deactivated' : 'activated'} successfully`,
        type: 'success'
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to update item status. Please try again.';
      showNotification({
        message: errorMessage,
        type: 'error'
      });
    }
  };

  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="font-medium text-gray-900">Quick Actions</h3>

        <div className="mt-4 space-y-3">
          <button
            onClick={handleStatusToggle}
            className={`flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${item.status === 'active'
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
            onClick={() => setIsModalOpen(true)}
            className="flex w-full items-center justify-center rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Item
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};