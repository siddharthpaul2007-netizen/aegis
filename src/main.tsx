import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { IntelligenceProvider } from './context/IntelligenceContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <IntelligenceProvider>
          <App />
        </IntelligenceProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
