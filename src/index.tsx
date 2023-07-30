import React, { lazy, StrictMode, Suspense } from 'react';
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
const Imprint = lazy(() => import('./Imprint'));
const CookiePolicy = lazy(() => import('./CookiePolicy'));

const BrowserRouter = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<Suspense fallback={<div />}><Home /></Suspense>} index />
      <Route path="*" element={<Suspense fallback={<div />}><NotFound /></Suspense>} />
      <Route path="/Imprint" element={<Suspense fallback={<div />}><Imprint /></Suspense>} />
      <Route path="/CookiePolicy" element={<Suspense fallback={<div />}><CookiePolicy /></Suspense>} />
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