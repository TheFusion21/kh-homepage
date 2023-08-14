import React from 'react';
import * as Dom from 'react-dom/client';
import './index.css';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import App from './Pages/App';
import Search from './Pages/Search';
import Genre from './Pages/Genre';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="app/:appId" element={<App />} />
      <Route path="search/:query" element={<Search />} />
      <Route path="genre/:genre" element={<Genre />} />

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