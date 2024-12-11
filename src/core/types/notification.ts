export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface NotificationContextType {
  showNotification: (notification: Notification) => void;
  notification: Notification | null;
}