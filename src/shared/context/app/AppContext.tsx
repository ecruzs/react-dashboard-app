import { createContext } from 'react';
import { AppState } from '@/core/types/state';
import { AppAction } from '@/core/types/actions';

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);