import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from './roots/Home';
import Navbar from './components/Navbar.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar></Navbar>,
  },
  {
    path: '/classes',
    element: <Navbar></Navbar>,
  },
  {
    path: '/students',
    element: <Navbar></Navbar>,
  },
  {
    path: '/teachers',
    element: <Navbar></Navbar>,
  },
  {
    path: '/calendar',
    element: <Navbar></Navbar>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
