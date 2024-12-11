import { ReactNode, useState } from 'react';
import { NotificationContext } from './NotificationContext';
import { Notification } from '@/core/types';
import { NotificationToast } from './NotificationToast';

/**
 * Provider component that manages the notification system.
 * Features:
 * - Temporary notifications that auto-dismiss
 * - Global access to notification functionality
 * - Toast component rendering
 */
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  /**
   * Displays a notification and automatically dismisses it after 3 seconds.
   * Can be used for success messages, errors, and general notifications.
   * @param newNotification The notification object to display
   */
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