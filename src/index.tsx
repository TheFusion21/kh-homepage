import React, { StrictMode } from 'react';
import * as Dom from 'react-dom/client';
import '/index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Weather from './Weather/App';
import Crypto from './Crypto/App';
import NotFound from './NotFound';

const BrowserRouter = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="weather" element={<Weather />} />
      <Route path="crypto" element={<Crypto />} />
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
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={BrowserRouter} />
    </DndProvider>
  </StrictMode>
);