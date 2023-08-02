import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FiDelete
} from 'react-icons/fi';
import { evaluate } from 'mathjs';
const Calculator = ({ isLandscape } : { isLandscape: boolean}) => {
  const [history, setHistory] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const highAspectRatio = screen.width / screen.height > 2;
  
  const doMath = useCallback(() => {
    if (input === '') return;
    setHistory(input);
    let formula = input;
    formula = formula.replace('π', 'PI');
    formula = formula.replace('√', 'sqrt');
    formula = formula.replace('÷', '/');
    formula = formula.replace('x', '*');
    try {
      const result = evaluate(formula);
      setInput(result.toString());
    } catch (e) {
      setError(true);
      setInput('');
      console.error(e);s
    }
  }, [input]);

  const onButtonDown = useCallback(() => {
    longPressTimeout.current = setTimeout(() => setInput(''), 500);
  }, [longPressTimeout]);

  const onButtonUp = useCallback(() => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
  }, [longPressTimeout]);

  const buttons = useMemo(() => [
    {
      onClick: () => setInput((input) => input.slice(0, -1)),
      onButtonDown: onButtonDown,
      onButtonUp: onButtonUp,
      icon: <FiDelete className="w-6 h-6" />,
      key: 'delete',
    },
    {
      onClick: () => setInput((input) => input + '!'),
      icon: <span>!</span>,
      showInLandscape: false,
      key: 'factorial',
    },
    {
      onClick: () => setInput((input) => input + '('),
      icon: <span>(</span>,
      key: 'open-parenthesis',
    },
    {
      onClick: () => setInput((input) => input + ')'),
      icon: <span>)</span>,
      key: 'close-parenthesis',
    },
    {
      onClick: () => setInput((input) => input + '%'),
      icon: <span>%</span>,
      key: 'modulo',
    },
    {
      onClick: () => setInput((input) => input + 'π'),
      icon: <span>π</span>,
      key: 'pi',
    },


    {
      onClick: () => setInput((input) => input + 'sin('),
      icon: <span>sin</span>,
      showInLandscape: false,
      key: 'sin',
    },
    {
      onClick: () => setInput((input) => input + '7'),
      icon: <span>7</span>,
      key: 'seven',
    },
    {
      onClick: () => setInput((input) => input + '8'),
      icon: <span>8</span>,
      key: 'eight',
    },
    {
      onClick: () => setInput((input) => input + '9'),
      icon: <span>9</span>,
      key: 'nine',
    },
    {
      onClick: () => setInput((input) => input + 'x'),
      icon: <span>&#215;</span>,
      key: 'multiply',
    },
    {
      onClick: () => setInput((input) => input + '√('),
      icon: <span>&#8730;</span>,
      key: 'square-root',
    },


    {
      onClick: () => setInput((input) => input + 'cos('),
      icon: <span>cos</span>,
      showInLandscape: false,
      key: 'cos',
    },
    {
      onClick: () => setInput((input) => input + '4'),
      icon: <span>4</span>,
      key: 'four',
    },
    {
      onClick: () => setInput((input) => input + '5'),
      icon: <span>5</span>,
      key: 'five',
    },
    {
      onClick: () => setInput((input) => input + '6'),
      icon: <span>6</span>,
      key: 'six',
    },
    {
      onClick: () => setInput((input) => input + '÷'),
      icon: <span>&#247;</span>,
      key: 'divide',
    },
    {
      onClick: () => setInput((input) => input + '²'),
      icon: <span>x<sup>2</sup></span>,
      key: 'square',
    },


    {
      onClick: () => setInput((input) => input + 'tan('),
      icon: <span>tan</span>,
      showInLandscape: false,
      key: 'tan',
    },
    {
      onClick: () => setInput((input) => input + '1'),
      icon: <span>1</span>,
      key: 'one',
    },
    {
      onClick: () => setInput((input) => input + '2'),
      icon: <span>2</span>,
      key: 'two',
    },
    {
      onClick: () => setInput((input) => input + '3'),
      icon: <span>3</span>,
      key: 'three',
    },
    {
      onClick: () => setInput((input) => input + '-'),
      icon: <span>-</span>,
      key: 'subtract',
    },
    {
      onClick: () => setInput((input) => input + '+'),
      icon: <span>+</span>,
      key: 'add',
    },

    {
      onClick: () => setInput((input) => input + 'log('),
      icon: <span>log</span>,
      showInLandscape: false,
      key: 'log',
    },
    {
      onClick: () => setInput((input) => input + '0'),
      icon: <span>0</span>,
      key: 'zero',
    },
    {
      onClick: () => setInput((input) => input + '.'),
      icon: <span>.</span>,
      key: 'decimal',
    },
    {
      onClick: () => setInput((input) => input + '%'),
      icon: <span>%</span>,
      key: 'percent',
    },
    {
      onClick: () => doMath(),
      icon: <span>=</span>,
      key: 'equals',
    }
  ], [isLandscape, doMath]);

  return (
    <>
      <div className="grow w-full text-right flex flex-col justify-end">
        {!highAspectRatio && (
          <span className="text-2xl font-ubuntu-mono text-zinc-500">
            {history}
          </span>
        )}
        <span className="text-3xl font-ubuntu-mono whitespace-nowrap break-keep hyphens-none">
          {/* We need a space to prevent history from being at the bottom */}
          &nbsp;{input === '' && error && 'Error'}{input}
        </span>
      </div>
      {/* Buttons */}
      <div className={`grid ${isLandscape ? 'grid-cols-6' : 'grid-cols-5'} gap-2 p-2`}>
        {buttons.filter(button => button.showInLandscape === undefined || button.showInLandscape !== isLandscape)
          .map((button, index, array) => (
          <div
            key={button.key}
            className={`rounded-md p-2 flex justify-center items-center ${index === array.length-1 ? 'bg-green-800 col-span-2 active:bg-green-700' : 'bg-zinc-800 active:bg-zinc-700'}`}
            onClick={button.onClick}
            onMouseDown={button.onButtonDown ?? undefined}
            onMouseUp={button.onButtonUp ?? undefined}
            onTouchStart={button.onButtonDown ?? undefined}
            onTouchEnd={button.onButtonUp ?? undefined}
          >
            {button.icon}
          </div>
        ))}
      </div>
    </>
  )
};

export default Calculator;