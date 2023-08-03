import React from 'react';
import UnitConverter from './UnitConverter';

type Unit = 'kmh' | 'mph' | 'ms' | 'fts' | 'knots' | 'mach';

const Units: Record<Unit, string> = {
  'kmh': 'Kilometers per hour(km/h)',
  'mph': 'Miles per hour(mph)',
  'ms': 'Meters per second(m/s)',
  'fts': 'Feet per second(ft/s)',
  'knots': 'Knots(knots)',
  'mach': 'Mach(Mach)',
};

const conversionMap: Record<Unit, Record<Unit, number>> = {
  'kmh': {
    'kmh': 1,
    'mph': 0.62137119223733,
    'ms': 0.27777777777778,
    'fts': 0.91134441528141,
    'knots': 0.53995680345572,
    'mach': 0.00081629761026597,
  },
  'mph': {
    'kmh': 1.609344,
    'mph': 1,
    'ms': 0.44704,
    'fts': 1.4666666666667,
    'knots': 0.86897624190065,
    'mach': 0.0013135802469136,
  },
  'ms': {
    'kmh': 3.6,
    'mph': 2.2369362920544,
    'ms': 1,
    'fts': 3.2808398950131,
    'knots': 1.9438444924406,
    'mach': 0.0029385833333333,
  },
  'fts': {
    'kmh': 1.09728,
    'mph': 0.68181818181818,
    'ms': 0.3048,
    'fts': 1,
    'knots': 0.5924838012959,
    'mach': 0.00089596666666667,
  },
  'knots': {
    'kmh': 1.852,
    'mph': 1.1507794480235,
    'ms': 0.51444444444444,
    'fts': 1.6878098571012,
    'knots': 1,
    'mach': 0.0015116666666667,
  },
  'mach': {
    'kmh': 1225.044,
    'mph': 761.207051,
    'ms': 340.294,
    'fts': 1116.4370079,
    'knots': 661.4708425,
    'mach': 1,
  },
};

const Speed = ({ isLandscape } : { isLandscape: boolean}) => {

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
      defaultFrom='kmh'
      defaultTo='mph'
      isLandscape={isLandscape}
      conversionFunction={conversionFunction}
      units={Units}
    />
  )
};

export default Speed;