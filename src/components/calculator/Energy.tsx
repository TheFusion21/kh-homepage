import React from 'react';
import UnitConverter from './UnitConverter';

type Unit = 'J' | 'kJ' | 'cal' | 'kcal' | 'Wh' | 'kWh' | 'BTU' | 'ftlb';

const Units: Record<Unit, string> = {
  'J': 'Joule(J)',
  'kJ': 'Kilojoule(kJ)',
  'cal': 'Calorie(cal)',
  'kcal': 'Kilocalorie(kcal)',
  'Wh': 'Watt-hour(Wh)',
  'kWh': 'Kilowatt-hour(kWh)',
  'BTU': 'British thermal unit(BTU)',
  'ftlb': 'Foot-pound(ft·lb)',
};

const conversionMap: Record<Unit, Record<Unit, number>> = {
  'J': {
    'J': 1,
    'kJ': 0.001,
    'cal': 0.239005736,
    'kcal': 0.000239006,
    'Wh': 0.000277778,
    'kWh': 0.000000278,
    'BTU': 0.000947817,
    'ftlb': 0.737562149,
  },
  'kJ': {
    'J': 1000,
    'kJ': 1,
    'cal': 239.005736,
    'kcal': 0.239006,
    'Wh': 0.277778,
    'kWh': 0.000278,
    'BTU': 0.947817,
    'ftlb': 737.562149,
  },
  'cal': {
    'J': 4.184,
    'kJ': 0.004184,
    'cal': 1,
    'kcal': 0.001,
    'Wh': 0.001162222,
    'kWh': 0.000001162,
    'BTU': 0.003965666,
    'ftlb': 3.085960006,
  },
  'kcal': {
    'J': 4184,
    'kJ': 4.184,
    'cal': 1000,
    'kcal': 1,
    'Wh': 1.162222,
    'kWh': 0.001162,
    'BTU': 3.965666,
    'ftlb': 3085.960006,
  },
  'Wh': {
    'J': 3600,
    'kJ': 3.6,
    'cal': 860.421,
    'kcal': 0.860421,
    'Wh': 1,
    'kWh': 0.001,
    'BTU': 3.412141,
    'ftlb': 2655.223737,
  },
  'kWh': {
    'J': 3600000,
    'kJ': 3600,
    'cal': 860421,
    'kcal': 860.421,
    'Wh': 1000,
    'kWh': 1,
    'BTU': 3412.141,
    'ftlb': 2655223.737,
  },
  'BTU': {
    'J': 1055.055852,
    'kJ': 1.055056,
    'cal': 252.1644,
    'kcal': 0.252164,
    'Wh': 0.293071,
    'kWh': 0.000293,
    'BTU': 1,
    'ftlb': 778.169262,
  },
  'ftlb': {
    'J': 1.355818,
    'kJ': 0.001356,
    'cal': 0.324048,
    'kcal': 0.000324,
    'Wh': 0.000376616,
    'kWh': 0.000000377,
    'BTU': 0.001285,
    'ftlb': 1,
  },
};

const Energy = ({ isLandscape } : { isLandscape: boolean}) => {

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
      defaultFrom='J'
      defaultTo='Wh'
      isLandscape={isLandscape}
      conversionFunction={conversionFunction}
      units={Units}
    />
  )
};

export default Energy;