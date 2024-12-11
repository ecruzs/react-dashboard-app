import { createContext } from 'react';
import { NotificationContextType } from '@/core/types';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);