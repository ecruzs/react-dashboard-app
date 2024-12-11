import { useNotification } from "./useNotification";

export const NotificationToast = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className={`rounded-lg px-6 py-3 shadow-lg ${getBackgroundColor(notification.type)} text-white`}
      >
        <p className="text-sm font-medium">{notification.message}</p>
      </div>
    </div>
  );
};