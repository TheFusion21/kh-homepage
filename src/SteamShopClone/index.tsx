import React from 'react';
import * as Dom from 'react-dom/client';
import './index.css';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  ),
  {
    basename: '/apps/ssc',
  }
);

const root = Dom.createRoot(document.getElementById('root')!);
root.render(
  <RouterProvider router={router} />
);