import React from 'react';
import UnitConverter from './UnitConverter';

type Unit = 'km2' | 'm2' | 'dm2' | 'cm2' | 'mm2' | 'mi2' | 'yd2' | 'ft2' | 'in2' | 'ac' | 'ha' | 'ar';
const Units: Record<Unit, string> = {
  'km2': 'Square kilometers(km²)',
  'm2': 'Square meters(m²)',
  'dm2': 'Square decimeters(dm²)',
  'cm2': 'Square centimeters(cm²)',
  'mm2': 'Square millimeters(mm²)',
  'mi2': 'Square miles(mi²)',
  'yd2': 'Square yards(yd²)',
  'ft2': 'Square feet(ft²)',
  'in2': 'Square inches(in²)',
  'ac': 'Acres(ac)',
  'ha': 'Hectares(ha)',
  'ar': 'Ares(a)',
};

const conversionMap: Record<Unit, Record<Unit, number>> = {
  'km2': {
    'km2': 1,
    'm2': 1000000,
    'dm2': 100000000,
    'cm2': 10000000000,
    'mm2': 1000000000000,
    'mi2': 0.386102,
    'yd2': 1196000,
    'ft2': 10760000,
    'in2': 1550000000,
    'ac': 247.105,
    'ha': 100,
    'ar': 10000,
  },
  'm2': {
    'km2': 0.000001,
    'm2': 1,
    'dm2': 100,
    'cm2': 10000,
    'mm2': 1000000,
    'mi2': 3.861e-7,
    'yd2': 1.196,
    'ft2': 10.764,
    'in2': 1550,
    'ac': 0.000247105,
    'ha': 0.0001,
    'ar': 0.01,
  },
  'dm2': {
    'km2': 1e-8,
    'm2': 0.01,
    'dm2': 1,
    'cm2': 100,
    'mm2': 10000,
    'mi2': 3.861e-10,
    'yd2': 0.001196,
    'ft2': 0.010764,
    'in2': 1.55,
    'ac': 2.471e-8,
    'ha': 1e-8,
    'ar': 0.0001,
  },
  'cm2': {
    'km2': 1e-10,
    'm2': 0.0001,
    'dm2': 0.01,
    'cm2': 1,
    'mm2': 100,
    'mi2': 3.861e-11,
    'yd2': 0.0001196,
    'ft2': 0.001076,
    'in2': 0.155,
    'ac': 2.471e-10,
    'ha': 1e-10,
    'ar': 1e-8,
  },
  'mm2': {
    'km2': 1e-12,
    'm2': 0.000001,
    'dm2': 0.0001,
    'cm2': 0.01,
    'mm2': 1,
    'mi2': 3.861e-13,
    'yd2': 0.000001196,
    'ft2': 0.00001076,
    'in2': 0.00155,
    'ac': 2.471e-12,
    'ha': 1e-12,
    'ar': 1e-10,
  },
  'mi2': {
    'km2': 2.59,
    'm2': 2589988,
    'dm2': 258998800,
    'cm2': 25899880000,
    'mm2': 2589988000000,
    'mi2': 1,
    'yd2': 3098000,
    'ft2': 27880000,
    'in2': 4014000000,
    'ac': 640,
    'ha': 258.999,
    'ar': 25899.9,
  },
  'yd2': {
    'km2': 8.361e-7,
    'm2': 0.836127,
    'dm2': 83.6127,
    'cm2': 8361.27,
    'mm2': 836127,
    'mi2': 3.228e-7,
    'yd2': 1,
    'ft2': 9,
    'in2': 1296,
    'ac': 0.000206612,
    'ha': 8.361e-5,
    'ar': 0.00836127,
  },
  'ft2': {
    'km2': 9.29e-8,
    'm2': 0.092903,
    'dm2': 9.2903,
    'cm2': 929.03,
    'mm2': 92903,
    'mi2': 3.587e-8,
    'yd2': 0.111111,
    'ft2': 1,
    'in2': 144,
    'ac': 2.2957e-5,
    'ha': 9.2903e-6,
    'ar': 0.00092903,
  },
  'in2': {
    'km2': 6.4516e-10,
    'm2': 0.00064516,
    'dm2': 0.064516,
    'cm2': 6.4516,
    'mm2': 645.16,
    'mi2': 2.491e-10,
    'yd2': 0.000771605,
    'ft2': 0.00694444,
    'in2': 1,
    'ac': 1.5942e-7,
    'ha': 6.4516e-8,
    'ar': 6.4516e-6,
  },
  'ac': {
    'km2': 0.00404686,
    'm2': 4046.86,
    'dm2': 404686,
    'cm2': 40468600,
    'mm2': 4046860000,
    'mi2': 0.0015625,
    'yd2': 4840,
    'ft2': 43560,
    'in2': 6273000,
    'ac': 1,
    'ha': 0.404686,
    'ar': 40.4686,
  },
  'ha': {
    'km2': 0.01,
    'm2': 10000,
    'dm2': 1000000,
    'cm2': 100000000,
    'mm2': 10000000000,
    'mi2': 0.00386102,
    'yd2': 11960,
    'ft2': 107639,
    'in2': 15500000,
    'ac': 2.47105,
    'ha': 1,
    'ar': 100,
  },
  'ar': {
    'km2': 0.0001,
    'm2': 100,
    'dm2': 10000,
    'cm2': 1000000,
    'mm2': 100000000,
    'mi2': 3.861e-5,
    'yd2': 119.599,
    'ft2': 1076.39,
    'in2': 155000,
    'ac': 0.0247105,
    'ha': 0.01,
    'ar': 1,
  },
};

const Area = ({ isLandscape } : { isLandscape: boolean}) => {

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
      defaultFrom='km2'
      defaultTo='mi2'
      isLandscape={isLandscape}
      conversionFunction={conversionFunction}
      units={Units}
    />
  )
};

export default Area;