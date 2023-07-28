import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BsSearch,
  BsArrowDownShort,
  BsArrowUpShort,
} from 'react-icons/bs';
import { Asset, AssetHistoryStamp, Interval, Intervals, getAssetHistory, getSearchAssets } from './CoinCap';
import { useDebounce } from 'use-debounce';
import Chart from './Chart';
import useLocalStorage from '../utils/useLocalStorage';

const App = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>({
    "id": "ethereum-classic",
    "rank": "26",
    "symbol": "ETC",
    "name": "Ethereum Classic",
    "supply": "142211441.1691717200000000",
    "maxSupply": "210700000.0000000000000000",
    "marketCapUsd": "2608888229.3227416049338518",
    "volumeUsd24Hr": "31148078.6737876919442193",
    "priceUsd": "18.3451360022381279",
    "changePercent24Hr": "0.9790002983417519",
    "vwap24Hr": "18.4521489347586335",
    "explorer": "http://gastracker.io/"
  });
  const [debouncedSelectedAsset] = useDebounce(selectedAsset, 500);
  const [selectedInterval, setSelectedInterval] = useLocalStorage<Interval>('interval', 'd1');
  const [debouncedSelectedInterval] = useDebounce(selectedInterval, 500);
  const [assetHistory, setAssetHistory] = useState<AssetHistoryStamp[]>([]);

  const intervalToName = (interval: Interval) => {
    switch (interval) {
      case 'm1':
        return 'Last Minute';
      case 'm5':
        return 'Last 5 Minutes';
      case 'm15':
        return 'Last 15 Minutes';
      case 'm30':
        return 'Last 30 Minutes';
      case 'h1':
        return 'Last Hour';
      case 'h2':
        return 'Last 2 Hours';
      case 'h6':
        return 'Last 6 Hours';
      case 'h12':
        return 'Last 12 Hours';
      case 'd1':
        return 'Last Day';
    }
  };

  useEffect(() => {
    if (debouncedSearch) {
      getSearchAssets(debouncedSearch, 100).then((assets) => {
        const sortedAssets = assets.data.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
        setSearchResults(sortedAssets);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSelectedAsset) {
      getAssetHistory(debouncedSelectedAsset.id, debouncedSelectedInterval).then((history) => {
        setAssetHistory(history.data);
      });
    }
  }, [debouncedSelectedAsset, debouncedSelectedInterval]);

  const change = useMemo(() => {
    if (!selectedAsset) {
      return 0;
    }
    const { changePercent24Hr } = selectedAsset;
    const change = parseFloat(changePercent24Hr);
    // get positive or negative change
    if (change > 1) {
      return 1 - change;
    } else {
      return change - 1;
    }
  }, [selectedAsset]);

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  });

  const Number = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-row bg-slate-900 text-slate-200 h-screen">
      { /* Sidebar */}
      <div className="flex flex-col divide-y divide-slate-700 bg-slate-800 m-3 rounded-md">
        <div className="flex flex-row pr-4 py-1 shrink-0">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-lg ml-4 outline-none"
          />
          <BsSearch className="w-7 h-7 p-1 shrink-0" />
        </div>
        <div className="grow overflow-y-auto flex flex-col">
          {searchResults.map((asset) => (
            <span
              key={asset.id}
              className="text-lg px-4 py-1 hover:bg-white/10 cursor-pointer"
              onClick={() => setSelectedAsset(asset)}
            >
              {asset.name} - {asset.symbol}
            </span>
          ))}
        </div>
      </div>
      { /* Main Content */}
      <div className="grow my-3 mr-3 flex flex-col">
        { /* Topbar */}
        <div className="bg-slate-800 rounded-md p-2 px-4 flex flex-row justify-center items-center">
          <span className="uppercase text-xl">
            {selectedAsset?.name ?? '-'}
          </span>
          <div className="grow" />
          <select className="bg-slate-800 border border-slate-700 rounded-md p-2" value={selectedInterval} onChange={(e) => setSelectedInterval(e.target.value as Interval)}>
            {Intervals.map((interval) => (
              <option value={interval} key={interval}>
                {intervalToName(interval)}
              </option>
            ))}
          </select>
        </div>
        { /* Chart */}
        <div className="flex flex-col mt-3 bg-slate-800 rounded-md p-2 grow">
          <div className="flex flex-row divide-x-2 divide-slate-600 shrink-0">
            <div className="flex flex-col items-center px-8 basis-48 shrink-0">
              <span className="uppercase text-xl">
                VW Price
              </span>
              <div className="inline">
                <span className="text-lg font-bold">
                  {selectedAsset ? USDollar.format(parseFloat(selectedAsset.priceUsd)) : '-'}
                </span>
                {change > 0 && (
                  <BsArrowUpShort className="text-green-500 w-5 h-5 inline" />
                )}
                {change < 0 && (
                  <BsArrowDownShort className="text-red-500 w-5 h-5 inline" />
                )}
                <span className="text-xs">
                  {`${Math.abs(change).toFixed(2)} %`}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center px-8 basis-48 shrink-0">
              <span className="uppercase text-xl">
                Volume 24h
              </span>
              <div className="inline">
                <span className="text-lg font-bold">
                  {selectedAsset ? USDollar.format(parseFloat(selectedAsset.volumeUsd24Hr)) : '-'}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center px-8 basis-48 shrink-0">
              <span className="uppercase text-xl">
                Market Cap
              </span>
              <div className="inline">
                <span className="text-lg font-bold">
                  {selectedAsset ? USDollar.format(parseFloat(selectedAsset.marketCapUsd)) : '-'}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center px-8 basis-48 shrink-0">
              <span className="uppercase text-xl">
                Supply
              </span>
              <div className="inline">
                <span className="text-lg font-bold">
                  {selectedAsset ? Number.format(parseFloat(selectedAsset.supply)) : '-'}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center px-8 basis-48 shrink-0">
              <span className="uppercase text-xl">
                Max Supply
              </span>
              <div className="inline">
                <span className="text-lg font-bold">
                  {selectedAsset ? Number.format(parseFloat(selectedAsset.maxSupply)) : '-'}
                </span>
              </div>
            </div>
            <div className="grow" />
            <div className="flex flex-col items-center px-8 basis-48 shrink-0">
              <span className="uppercase text-xl">
                Rank
              </span>
              <div className="inline">
                <span className="text-lg font-bold">
                  {selectedAsset ? selectedAsset.rank : '-'}
                </span>
              </div>
            </div>
          </div>
          <div className="grow pt-2">
              <Chart data={assetHistory} interval={selectedInterval} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default App;

function toFixed(arg0: number) {
  throw new Error('Function not implemented.');
}
