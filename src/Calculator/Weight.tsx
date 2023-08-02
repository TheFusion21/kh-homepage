import React from 'react';
import UnitConverter from './UnitConverter';

type Unit = 'kg' | 'g' | 'mg' | 'lb' | 'oz' | 't' | 'st' | 'gr' | 'lt' | 'ct' | 'q';

const Units: Record<Unit, string> = {
  'kg': 'Kilograms(kg)',
  'g': 'Grams(g)',
  'mg': 'Milligrams(mg)',
  'lb': 'Pounds(lb)',
  'oz': 'Ounces(oz)',
  't': 'Tonnes(t)',
  'st': 'Stones(st)',
  'gr': 'Grains(gr)',
  'lt': 'Long tons(lt)',
  'ct': 'Carats(ct)',
  'q': 'Quarters(q)',
};

const conversionMap: Record<Unit, Record<Unit, number>> = {
  'kg': {
    'kg': 1,
    'g': 1000,
    'mg': 1000000,
    'lb': 2.20462,
    'oz': 35.274,
    't': 0.001,
    'st': 0.157473,
    'gr': 15432.4,
    'lt': 0.000984207,
    'ct': 5000,
    'q': 0.0196841,
  },
  'g': {
    'kg': 0.001,
    'g': 1,
    'mg': 1000,
    'lb': 0.00220462,
    'oz': 0.035274,
    't': 1e-6,
    'st': 0.000157473,
    'gr': 15.4324,
    'lt': 9.8421e-7,
    'ct': 5,
    'q': 0.0000196841,
  },
  'mg': {
    'kg': 1e-6,
    'g': 0.001,
    'mg': 1,
    'lb': 2.2046e-6,
    'oz': 3.5274e-5,
    't': 1e-9,
    'st': 1.5747e-7,
    'gr': 0.0154324,
    'lt': 9.8421e-10,
    'ct': 0.005,
    'q': 1.9684e-8,
  },
  'lb': {
    'kg': 0.453592,
    'g': 453.592,
    'mg': 453592,
    'lb': 1,
    'oz': 16,
    't': 0.000453592,
    'st': 0.0714286,
    'gr': 7000,
    'lt': 0.000446429,
    'ct': 2267.96,
    'q': 0.00446429,
  },
  'oz': {
    'kg': 0.0283495,
    'g': 28.3495,
    'mg': 28349.5,
    'lb': 0.0625,
    'oz': 1,
    't': 2.835e-5,
    'st': 0.00446429,
    'gr': 437.5,
    'lt': 2.7902e-5,
    'ct': 141.748,
    'q': 0.00027902,
  },
  't': {
    'kg': 1000,
    'g': 1e+6,
    'mg': 1e+9,
    'lb': 2204.62,
    'oz': 35274,
    't': 1,
    'st': 157.473,
    'gr': 15432400,
    'lt': 0.984207,
    'ct': 5e+6,
    'q': 19.6841,
  },
  'st': {
    'kg': 6.35029,
    'g': 6350.29,
    'mg': 6.35029e+6,
    'lb': 14,
    'oz': 224,
    't': 0.00635029,
    'st': 1,
    'gr': 98000,
    'lt': 0.00625,
    'ct': 31751.5,
    'q': 0.0625,
  },
  'gr': {
    'kg': 6.47989e-5,
    'g': 0.0647989,
    'mg': 64.7989,
    'lb': 0.000142857,
    'oz': 0.00228571,
    't': 6.4799e-8,
    'st': 1.02058e-5,
    'gr': 1,
    'lt': 6.37755e-8,
    'ct': 0.323994,
    'q': 6.37755e-6,
  },
  'lt': {
    'kg': 1016.05,
    'g': 1.01605e+6,
    'mg': 1.01605e+9,
    'lb': 2240,
    'oz': 35840,
    't': 1.01605,
    'st': 160,
    'gr': 15680000,
    'lt': 1,
    'ct': 5.08e+6,
    'q': 20.16,
  },
  'ct': {
    'kg': 0.0002,
    'g': 0.2,
    'mg': 200,
    'lb': 0.000440925,
    'oz': 0.00705479,
    't': 2e-7,
    'st': 3.14961e-5,
    'gr': 0.308647,
    'lt': 1.96842e-7,
    'ct': 1,
    'q': 1.96842e-5,
  },
  'q': {
    'kg': 50.8023,
    'g': 50802.3,
    'mg': 5.08023e+7,
    'lb': 112,
    'oz': 1792,
    't': 0.0508023,
    'st': 8,
    'gr': 784000,
    'lt': 0.0493827,
    'ct': 254000,
    'q': 1,
  },
};

const Weight = ({ isLandscape } : { isLandscape: boolean}) => {

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
      defaultFrom='kg'
      defaultTo='lb'
      isLandscape={isLandscape}
      conversionFunction={conversionFunction}
      units={Units}
    />
  )
};


export default Weight;