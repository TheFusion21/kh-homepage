import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import UnitConverter from './UnitConverter';

type Unit = 'eur' | 'usd' | 'gbp' | 'chf' | 'jpy' | 'aud' | 'cad' | 'nzd' | 'rub' | 'sek' | 'dkk' | 'nok' | 'pln' | 'czk' | 'huf' | 'hrk' | 'ron' | 'try' | 'ils' | 'zar' | 'brl' | 'myr' | 'php' | 'mxn' | 'thb' | 'idr' | 'sgd' | 'hkd' | 'krw' | 'inr' | 'twd' | 'cny' | 'vnd' | 'php' | 'ars' | 'cop' | 'clp' | 'pen' | 'uyu' | 'pyg' | 'bob' | 'dop' | 'crc' | 'gtq' | 'nzd';
const Units: Record<Unit, string> = {
  'eur': 'Euro (€)',
  'usd': 'US Dollar ($)',
  'gbp': 'British Pound (£)',
  'chf': 'Swiss Franc (CHF)',
  'jpy': 'Japanese Yen (¥)',
  'aud': 'Australian Dollar (A$)',
  'cad': 'Canadian Dollar (C$)',
  'nzd': 'New Zealand Dollar (NZ$)',
  'rub': 'Russian Ruble (₽)',
  'sek': 'Swedish Krona (kr)',
  'dkk': 'Danish Krone (kr)',
  'nok': 'Norwegian Krone (kr)',
  'pln': 'Polish Zloty (zł)',
  'czk': 'Czech Koruna (Kč)',
  'huf': 'Hungarian Forint (Ft)',
  'hrk': 'Croatian Kuna (kn)',
  'ron': 'Romanian Leu (lei)',
  'try': 'Turkish Lira (₺)',
  'ils': 'Israeli Shekel (₪)',
  'zar': 'South African Rand (R)',
  'brl': 'Brazilian Real (R$)',
  'myr': 'Malaysian Ringgit (RM)',
  'php': 'Philippine Peso (₱)',
  'mxn': 'Mexican Peso (MX$)',
  'thb': 'Thai Baht (฿)',
  'idr': 'Indonesian Rupiah (Rp)',
  'sgd': 'Singapore Dollar (S$)',
  'hkd': 'Hong Kong Dollar (HK$)',
  'krw': 'South Korean Won (₩)',
  'inr': 'Indian Rupee (₹)',
  'twd': 'New Taiwan Dollar (NT$)',
  'cny': 'Chinese Yuan (CN¥)',
  'vnd': 'Vietnamese Dong (₫)',
  'ars': 'Argentine Peso (ARS)',
  'cop': 'Colombian Peso (COP)',
  'clp': 'Chilean Peso (CLP)',
  'pen': 'Peruvian Sol (PEN)',
  'uyu': 'Uruguayan Peso (UYU)',
  'pyg': 'Paraguayan Guarani (PYG)',
  'bob': 'Bolivian Boliviano (BOB)',
  'dop': 'Dominican Peso (DOP)',
  'crc': 'Costa Rican Colón (CRC)',
  'gtq': 'Guatemalan Quetzal (GTQ)',
};

interface CurrencyData<T extends string> {
  date: string;
  T: number;
}
const Currency = ({ isLandscape } : { isLandscape: boolean}) => {

  const conversionFunction = (from: Unit, to: Unit, value: number): Promise<number> => {
    return fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`)
      .then(response => response.json())
      .then((data: CurrencyData<typeof from>) => {
        return data[to] * value;
      }).catch(() => {
        return 0;
      });
  };

  return (
    <UnitConverter
      units={Units}
      defaultFrom='eur'
      defaultTo='usd'
      isLandscape={isLandscape}
      conversionFunction={conversionFunction}
    />
  )
};

export default Currency;