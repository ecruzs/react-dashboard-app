import { useContext } from 'react';
import { AppContext } from './AppContext';

/**
 * Custom hook for accessing the global application context.
 * Provides type safety and helpful error messages.
 * Must be used within AppProvider component tree.
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}