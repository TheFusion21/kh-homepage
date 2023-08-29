import React from 'react';
import * as Dom from 'react-dom/client';
import './index.css';
import Home from './Home';
import FullPost from './FullPost';
import FullUser from './FullUser';
import Layout from './Layout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="post/:postId" element={<FullPost />} />
      <Route path="/:userId" element={<FullUser />} />
    </Route>
  ),
  {
    basename: '/apps/insta',
  }
);

const root = Dom.createRoot(document.getElementById('root')!);
root.render(
  <RouterProvider router={router} />
);