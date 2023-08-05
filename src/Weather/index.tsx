import React from 'react';
import * as Dom from 'react-dom/client';
import './index.css';
import App from './App';

const root = Dom.createRoot(document.getElementById('root')!);
root.render(
  <App />
);