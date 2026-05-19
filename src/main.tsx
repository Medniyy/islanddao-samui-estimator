import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UmamiAnalytics } from './components/UmamiAnalytics';
import { applyTheme, getStoredTheme } from './hooks/useTheme';
import './index.css';
import App from './App.tsx';

applyTheme(getStoredTheme());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UmamiAnalytics />
    <App />
  </StrictMode>,
);
