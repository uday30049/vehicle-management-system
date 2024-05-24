import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import App from './App';
import { CssBaseline } from '@mui/material';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Using createRoot

  root.render(
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
