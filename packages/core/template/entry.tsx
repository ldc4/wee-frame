import * as React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import { RouterProvider } from "react-router-dom";

import './public/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
