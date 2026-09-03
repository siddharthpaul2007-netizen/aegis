import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { IntelligenceProvider } from './context/IntelligenceContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <IntelligenceProvider>
        <App />
      </IntelligenceProvider>
    </ThemeProvider>
  </React.StrictMode>
);
