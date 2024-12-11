import { createContext } from 'react';
import { NotificationContextType } from '@/core/types';

/**
 * Context for the global notification system.
 * Provides access to notification state and display functions.
 * Undefined by default - requires NotificationProvider wrapper.
 */
export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);