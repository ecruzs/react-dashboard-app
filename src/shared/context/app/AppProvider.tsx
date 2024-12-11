import { useReducer, ReactNode } from 'react';
import { AppContext } from './AppContext';
import { AppState } from '@/core/types/state';
import { AppAction } from '@/core/types/actions';

const initialState: AppState = {
  items: [],
  filters: {
    search: '',
    category: '',
    status: '',
  },
  sort: {
    field: 'createdAt',
    direction: 'desc',
  },
  isLoading: false,
  error: null,
};

/**
 * Reducer function handling all state mutations.
 * Implements immutable state updates for predictable behavior.
 */
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) => 
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

/**
 * Global state provider implementing Redux-like pattern with useReducer.
 * Features:
 * - Centralized state management
 * - Type-safe actions and state updates
 * - Predictable state mutations
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}