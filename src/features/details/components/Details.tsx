import { useParams } from 'react-router-dom';

export const Details = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Item Details</h1>
      <div className="rounded-lg bg-white p-6 shadow">
        {/* TODO: item details */}
        <p>Details for item {id}</p>
      </div>
    </div>
  );
};