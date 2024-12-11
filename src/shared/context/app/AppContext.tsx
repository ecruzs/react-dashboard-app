import { createContext } from 'react';
import { AppState } from '@/core/types/state';
import { AppAction } from '@/core/types/actions';

/**
 * Context for global application state.
 * Provides type-safe access to state and dispatch function.
 */
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);