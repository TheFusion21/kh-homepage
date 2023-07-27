import React from 'react';
import { useDrag } from 'react-dnd';
import {
  BsCheck2Square,
  BsJustifyLeft,
  BsClock,
} from 'react-icons/bs';
import { TodoCard } from './types';
const Card = (
  {
    card,
  } : {
    card: TodoCard;
  },
) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type: 'CARD',
    collect: (monitor) => ({
      opacity : monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  <div className="dark:bg-zinc-700 bg-zinc-100 rounded-md p-2" ref={drag} style={{ opacity }}>
    <h3 className="text-sm font-semibold">{card.title}</h3>
    <div className="flex flex-row gap-2 mt-2 w-full items-center">
      {card.description && (
        <BsJustifyLeft className="w-6 h-6 p-1" />
      )}
      {card.todos.length > 0 && (
        <div className={`pr-1 rounded-md ${card.todos.filter((todo) => todo.done).length === card.todos.length ? 'bg-green-400 dark:bg-green-600' : ''}`}>
          <BsCheck2Square className="w-6 h-6 p-1 inline" />
          <span className="inline text-xs">
            {card.todos.filter((todo) => todo.done).length}/{card.todos.length}
          </span>
        </div>
      )}
      {card.dueDate && (
        <div className={`pr-1 rounded-md ${card.dueDate < new Date() ? 'bg-red-400 dark:bg-red-600' : ''}`}>
          <BsClock className="w-6 h-6 p-1 inline" />
          <span className="inline text-xs">
            {card.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      )}
    </div>
  </div>
};

export default Card;