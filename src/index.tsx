import React, { lazy, StrictMode } from 'react';
import * as Dom from 'react-dom/client';
import '/index.css';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const Home = lazy(() => import('./Home/App'));
const NotFound = lazy(() => import('./NotFound'));

const BrowserRouter = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<Home />} index />
      <Route path="*" element={<NotFound />} />
    </>
  ),
  {
    basename: '/',
  }
)
const root = Dom.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
      <RouterProvider router={BrowserRouter} />
  </StrictMode>
);