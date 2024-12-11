import { ReactNode, useState } from 'react';
import { NotificationContext } from './NotificationContext';
import { Notification } from '../../../core/types/notification';
import { NotificationToast } from './NotificationToast';

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      <NotificationToast />
    </NotificationContext.Provider>
  );
}