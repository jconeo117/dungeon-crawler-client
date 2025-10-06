import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // 👈 Esta línea es CRÍTICA
import { AppRouter } from './Routes/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);