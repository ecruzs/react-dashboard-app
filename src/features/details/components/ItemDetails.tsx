import { useState } from 'react';
import { useItems } from '@/shared/hooks/useItems';
import { Item } from '@/core/types/item';
import { ItemFormData } from '../validation/itemSchema';
import { ItemDetailsView } from './ItemDetailsView';
import { ItemEditForm } from './ItemEditForm';

interface ItemDetailsProps {
  item: Item;
}

export const ItemDetails = ({ item }: ItemDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateItem } = useItems();

  const handleSave = (data: ItemFormData) => {
    updateItem({
      ...item,
      ...data
    });
    setIsEditing(false);
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