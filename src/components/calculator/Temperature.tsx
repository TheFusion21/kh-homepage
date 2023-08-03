import React from 'react';
import UnitConverter from './UnitConverter';

type Unit = 'C' | 'F' | 'K' | 'R';

const Units: Record<Unit, string> = {
  'C': 'Celsius(°C)',
  'F': 'Fahrenheit(°F)',
  'K': 'Kelvin(K)',
  'R': 'Rankine(°R)',
};

const conversionMap: Record<Unit, Record<Unit, number>> = {
  'C': {
    'C': 1,
    'F': 33.8,
    'K': 274.15,
    'R': 493.47,
  },
  'F': {
    'C': -17.222222222222,
    'F': 1,
    'K': 255.92777777778,
    'R': 460.67,
  },
  'K': {
    'C': -272.15,
    'F': -457.87,
    'K': 1,
    'R': 1.8,
  },
  'R': {
    'C': -272.59444444444,
    'F': -458.67,
    'K': 0.55555555555556,
    'R': 1,
  },
};

const Temperature = ({ isLandscape } : { isLandscape: boolean}) => {

  const conversionFunction = (from: Unit, to: Unit, value: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (from === to) {
        resolve(value);
      }
      else {
        resolve(conversionMap[from][to] * value);
      }
    });
  };

  return (
    <UnitConverter
      defaultFrom='C'
      defaultTo='F'
      isLandscape={isLandscape}
      conversionFunction={conversionFunction}
      units={Units}
    />
  )
};

export default Temperature;