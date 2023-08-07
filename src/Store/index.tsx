import React from 'react';
import * as Dom from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<div>asdasdasd</div>} />
    </Route>
  ), {
    basename: '/apps/store'
  }
);

const root = Dom.createRoot(document.getElementById('root')!);
root.render(
  <RouterProvider router={routes} />
);