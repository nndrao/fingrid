import React from 'react';
import ReactDOM from 'react-dom/client';
import { LicenseManager } from 'ag-grid-enterprise';

// Import AG Grid Enterprise
import 'ag-grid-enterprise';

// Import AG Grid Styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

import App from './App';
import './index.css';

// Set AG Grid Enterprise License if available
const LICENSE_KEY = import.meta.env.VITE_AG_GRID_LICENSE_KEY;
if (LICENSE_KEY) {
  LicenseManager.setLicenseKey(LICENSE_KEY);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);