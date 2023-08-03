import React, { useMemo } from 'react';
import { FiDelete } from 'react-icons/fi';
import isMobile from '../utils/isMobile';

const Numpad = ({onInput, isLandscape} : {onInput: (input: string) => void, isLandscape: boolean}) => {

  const buttons = useMemo(() => [
    {
      key: 'seven',
      onClick: () => onInput('7'),
      icon: <span>7</span>,
    },
    {
      key: 'eight',
      onClick: () => onInput('8'),
      icon: <span>8</span>,
    },
    {
      key: 'nine',
      onClick: () => onInput('9'),
      icon: <span>9</span>,
    },
    {
      key: 'clear',
      onClick: () => onInput('clear'),
      icon: <span>C</span>,
    },


    {
      key: 'four',
      onClick: () => onInput('4'),
      icon: <span>4</span>,
    },
    {
      key: 'five',
      onClick: () => onInput('5'),
      icon: <span>5</span>,
    },
    {
      key: 'six',
      onClick: () => onInput('6'),
      icon: <span>6</span>,
    },
    {
      key: 'delete',
      onClick: () => onInput('delete'),
      icon: <FiDelete className="w-6 h-6" />,
    },


    {
      key: 'one',
      onClick: () => onInput('1'),
      icon: <span>1</span>,
    },
    {
      key: 'two',
      onClick: () => onInput('2'),
      icon: <span>2</span>,
    },
    {
      key: 'three',
      onClick: () => onInput('3'),
      icon: <span>3</span>,
    },
    {
      key: 'space1'
    },


    {
      key: '2zero',
      onClick: () => onInput('00'),
      icon: <span>00</span>,
    },
    {
      key: 'zero',
      onClick: () => onInput('0'),
      icon: <span>0</span>,
    },
    {
      key: 'decimal',
      onClick: () => onInput('.'),
      icon: <span>.</span>,
    },
  ], [onInput]);
  
  return (
    <div className={`basis-1/2 ${isLandscape || (window.innerWidth > window.innerHeight && isMobile()) ? 'h-full' : 'w-full'} flex justify-center items-center shrink`}>
      <div className={`grid grid-cols-4 p-4 gap-4 aspect-square ${isLandscape ? 'h-full' : ((window.innerWidth > window.innerHeight && isMobile()) ? 'w-full' : 'h-full')} max-h-full max-w-full`}>
        {buttons.map((button) => (
          button.icon ? (
            <button
              key={button.key}
              className="bg-zinc-800 rounded-full aspect-square flex items-center justify-center text-2xl p-1"
              onClick={button.onClick}
            >
              {button.icon}
            </button>
          ) : (
            <div key={button.key} />
          )
        ))}
      </div>
    </div>
  )
};

export default Numpad;