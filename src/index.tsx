import React from 'react';
import * as Dom from 'react-dom/client';
import '/index.css';
import Todo from './Todo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = Dom.createRoot(document.getElementById('root')!);
root.render(
    <DndProvider backend={HTML5Backend}>
        <Todo />
    </DndProvider>
);