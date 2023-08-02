import React, { lazy, StrictMode, Suspense } from 'react';
import * as Dom from 'react-dom/client';
import '/index.css';
import '/googlefont.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const Calculator = lazy(() => import('./Calculator/App'));
const Home = lazy(() => import('./Home/App'));
const NotFound = lazy(() => import('./NotFound'));
const Imprint = lazy(() => import('./Imprint'));

const BrowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Suspense><Home /></Suspense>} index />
      <Route path="/*" element={<Suspense><NotFound /></Suspense>} />
      <Route path="/Imprint" element={<Suspense><Imprint /></Suspense>} />
      <Route path="/weather-app" element={<Suspense><div /></Suspense>} />
      <Route path="/calculator" element={<Suspense><Calculator /></Suspense>} />
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