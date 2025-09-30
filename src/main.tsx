import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './Routes/index'; // Importamos el enrutador

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter /> {/* Usamos el enrutador aquí */}
  </React.StrictMode>,
);