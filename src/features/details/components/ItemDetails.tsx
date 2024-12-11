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

export const ItemDetails = ({ item }: ItemDetailsProps) => {
  const { showNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const { updateItem } = useItems();


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