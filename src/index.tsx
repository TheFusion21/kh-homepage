import React, { StrictMode } from 'react';
import * as Dom from 'react-dom/client';
import '/index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Weather from './Weather/App';


const root = Dom.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Weather />
    </DndProvider>
  </StrictMode>
);