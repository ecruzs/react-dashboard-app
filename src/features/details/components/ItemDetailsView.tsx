import { Item } from '@/core/types';

interface ItemDetailsViewProps {
  item: Item;
  onEdit: () => void;
}

export const ItemDetailsView = ({ item, onEdit }: ItemDetailsViewProps) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
        </div>
        <button
          onClick={onEdit}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit
        </button>
      </div>

      <dl className="grid gap-x-6 gap-y-8 md:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-gray-500">Value</dt>
          <dd className="mt-2 text-lg text-gray-900">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(item.value)}
          </dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="mt-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              item.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <span className={`mr-2 h-2 w-2 rounded-full ${
                item.status === 'active' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </dd>
        </div>
        
        <div>
          <dt className="text-sm font-medium text-gray-500">Created At</dt>
          <dd className="mt-2 text-gray-900">
            {new Date(item.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </dd>
        </div>

        {item.description && (
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-2 text-gray-900">{item.description}</dd>
          </div>
        )}
      </dl>
    </div>
  );
};