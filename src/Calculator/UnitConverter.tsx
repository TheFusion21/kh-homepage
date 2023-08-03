import React, { useCallback, useEffect, useState } from 'react';
import {
  BsChevronRight,
} from 'react-icons/bs';
import Numpad from './Numpad';
import isMobile from '../utils/isMobile';

const UnitConverter = <Unit extends string>(
  {
    isLandscape,
    defaultFrom,
    defaultTo,
    units,
    conversionFunction,
  } : {
    isLandscape: boolean,
    defaultFrom: Unit,
    defaultTo: Unit,
    units: Record<Unit, string>,
    conversionFunction: (from: Unit, to: Unit, value: number) => Promise<number>,
  }
) => {
  const [fromUnit, setFromUnit] = useState<Unit>(defaultFrom);
  const [toUnit, setToUnit] = useState<Unit>(defaultTo);
  const [fromValue, setFromValue] = useState(0.0);
  const [toValue, setToValue] = useState(0.0);
  const [activeInput, setActiveInput] = useState<'from' | 'to'>('from');
  const [selectionMenuOpen, setSelectionMenuOpen] = useState<'from' | 'to' | null>(null);

  const onInput = useCallback((input: string) => {
    if (activeInput === 'from') {
      setFromValue((prev) => Number.parseFloat(prev.toString() + input));
    } else {
      setToValue((prev) => Number.parseFloat(prev.toString() + input));
    }
  }, [activeInput]);

  const convert = async (from: number, fromUnit: Unit, toUnit: Unit) => {
    if (fromUnit === toUnit) {
      return from;
    }
    return await conversionFunction(fromUnit, toUnit, from);
  };

  useEffect(() => {
    if (activeInput === 'from') {
      convert(fromValue, fromUnit, toUnit).then((value) => setToValue(value));
    } else {
      convert(toValue, toUnit, fromUnit).then((value) => setFromValue(value));
    }
  }, [fromValue, toValue, activeInput, fromUnit, toUnit]);

  const openSelectionMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>, input: 'from' | 'to') => {
    e.stopPropagation();
    setSelectionMenuOpen(input);
  }, []);

  const handleUnitSelection = useCallback((unit: Unit) => {
    if (selectionMenuOpen === 'from') {
      setFromUnit(unit);
    } else {
      setToUnit(unit);
    }
    setSelectionMenuOpen(null);
  }, [activeInput]);

  return (
    <div className={`grow flex ${isLandscape || (window.innerWidth > window.innerHeight && isMobile()) ? 'flex-row h-full' : 'flex-col w-full'} justify-center items-center relative`}>
      <div className={`flex ${isLandscape || (window.innerWidth > window.innerHeight && isMobile()) ? 'flex-col h-full p-4 w-full basis-1/2' : 'flex-col grow'} justify-evenly items-center shrink-0`}>
        <div className="bg-zinc-800 px-3 py-1 rounded-md mx-4 cursor-pointer w-full" onClick={() => setActiveInput('from')}>
          <p className="text-lg text-zinc-400 hover:text-zinc-300" onClick={(e) => openSelectionMenu(e, 'from')}>
            {units[fromUnit]}<BsChevronRight className="inline"/>
          </p>
          <p className={`text-lg ${activeInput === 'from' ? 'text-yellow-400' : ''}`}>{fromValue}</p>
        </div>
        <div className="bg-zinc-800 px-3 py-1 rounded-md mx-4 cursor-pointer w-full" onClick={() => setActiveInput('to')}>
          <p className="text-lg text-zinc-400 hover:text-zinc-300" onClick={(e) => openSelectionMenu(e, 'to')}>
            {units[toUnit]}<BsChevronRight className="inline"/>
          </p>
          <p className={`text-lg ${activeInput === 'to' ? 'text-yellow-400' : ''}`}>{toValue}</p>
        </div>
      </div>
      <Numpad onInput={onInput} isLandscape={isLandscape} />
      {/* Unit Selection */}
      <div
        className="absolute w-full h-full bg-zinc-800 rounded-md transition-transform duration-500 flex flex-col overflow-y-auto"
        style={{ transform: selectionMenuOpen !== null ? 'translateY(0%)' : 'translateY(100%)' }}
      >
        {Object.keys(units).map((unit) => (
          <div key={unit} className="px-2 py-2 hover:bg-white/5 cursor-pointer" onClick={() => handleUnitSelection(unit as Unit)}>
            {units[unit]}
          </div>
        ))}
      </div>
    </div>
  )
};

export default UnitConverter;