import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { loadState, saveState, resetState, navigateTo, goBack } from '../state/appState';
import type { AppState } from '../state/appState';
import type { Screen } from '../types';

// ============================================
// Toast System
// ============================================

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  navigate: (screen: Screen) => void;
  back: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(loadState);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const navigate = useCallback((screen: Screen) => {
    setState(prev => navigateTo(prev, screen));
  }, []);

  const back = useCallback(() => {
    setState(prev => goBack(prev));
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const resetDemo = useCallback(() => {
    const fresh = resetState();
    setState(fresh);
  }, []);

  return (
    <AppContext.Provider value={{ state, setState, navigate, back, showToast, resetDemo }}>
      {children}
      {/* Toast container */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map(t => (
            <div key={t.id} className={`toast ${t.type}`}>
              {t.message}
            </div>
          ))}
        </div>
      )}
    </AppContext.Provider>
  );
};

