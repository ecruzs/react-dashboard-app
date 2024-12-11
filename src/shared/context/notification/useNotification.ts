import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

/**
 * Custom hook for accessing the notification system.
 * Provides type-safe access to notification state and functions.
 * Must be used within a NotificationProvider component tree.
 */
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};