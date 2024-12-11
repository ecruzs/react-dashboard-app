import { useState } from 'react';
import { useItems } from '@/shared/hooks/useItems';
import { Item } from '@/core/types/item';
import { ItemFormData } from '../validation/itemSchema';
import { ItemDetailsView } from './ItemDetailsView';
import { ItemEditForm } from './ItemEditForm';
import { useNotification } from '@/shared/context';

interface ItemDetailsProps {
  item: Item;
}

/**
 * Container component that manages the state between view and edit modes.
 * Handles the edit/save workflow and error notifications.
 * Toggles between ItemDetailsView and ItemEditForm based on editing state.
 */
export const ItemDetails = ({ item }: ItemDetailsProps) => {
  const { showNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const { updateItem } = useItems();

  /**
   * Handles saving updated item data.
   * Merges existing item data with form updates.
   * Shows success/error notifications and exits edit mode on success.
   */
  const handleSave = async (data: ItemFormData) => {
    try {
      await updateItem({
        ...item,
        ...data
      });

      showNotification({
        message: 'Changes saved successfully',
        type: 'success'
      });
      setIsEditing(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to save changes. Please try again.';
      showNotification({
        message: errorMessage,
        type: 'error'
      });
    }
  };

  if (isEditing) {
    return (
      <ItemEditForm
        item={item}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return <ItemDetailsView item={item} onEdit={() => setIsEditing(true)} />;
};