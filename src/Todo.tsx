import React, { useCallback, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import {
  SlOptions,
  SlMenu,
} from 'react-icons/sl';
import {
  BsCheck2Square,
  BsJustifyLeft,
  BsClock,
} from 'react-icons/bs';

//https://github.com/public-apis/public-apis
const Todo = () => {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage('sidebarOpen', false);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const handleDrop = useCallback(() => {
    
  }, []);

  const handleTodayClick = useCallback(() => {

  }, []);

  useEffect(() => {
    // toggle dark class on html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 flex flex-col w-screen h-screen">
      <header className="flex flex-row border-b p-2 border-zinc-200 dark:border-zinc-600 items-center">
        <button
          type="button"
          className="h-12 w-12 rounded-full p-3
                        hover:bg-black/5 active:bg-black/10
                        dark:hover:bg-white/5 dark:active:bg-white/10
                    "
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <SlMenu className="w-full h-full" />
        </button>
        <div className="flex-grow" />
        <label htmlFor="darkToggle" className="relative w-10 h-6 inline-block">
          <input
            id="darkToggle"
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            aria-checked={darkMode}
            aria-label="Toggle dark mode"
          />
          <span
            className={`
                            absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-zinc-300'}
                            before:absolute before:content-[''] before:w-4 before:h-4 before:rounded-full before:bg-zinc-50 before:top-1 before:left-1
                            before:transition-transform before:duration-100 before:ease-in-out ${darkMode ? 'before:transform before:translate-x-full' : ''}
                        `}
          />
        </label>
      </header>
      {/* Main content */}
      <div className="flex flex-row grow overflow-y-hidden">
        <div className="flex flex-row grow p-4 gap-4 justify-start items-start overflow-x-auto overflow-y-hidden">
          {categories.map((category) => (
            <div className="dark:bg-zinc-800 bg-zinc-200 px-3 py-2 rounded-md w-80 max-h-full shrink-0 flex flex-col">
              {/* Category header */}
              <div className="flex flex-row items-center">
                <h2 className="text-md font-semibold">{category.title}</h2>
                <div className="flex-grow" />
                <button
                  type="button"
                  className="rounded-full p-2
                                    hover:bg-black/5 active:bg-black/10
                                    dark:hover:bg-white/5 dark:active:bg-white/10"
                >
                  <SlOptions className="w-5 h-5" />
                </button>
              </div>
              {/* Category cards */}
              <div
                className="mt-2 grow overflow-y-auto max-h-full"
              >
                <div className="flex flex-col gap-2">
                  {category.cards.map((card) => (
                    <div className="dark:bg-zinc-700 bg-zinc-100 rounded-md p-2">
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
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Todo;