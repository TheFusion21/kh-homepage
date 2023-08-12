import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppResult, search, AppDetail, getGameDetails } from 'SteamShopClone/steam';
import {
  AiFillWindows,
  AiFillApple,
} from 'react-icons/ai';

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<AppResult[]>([]);
  const [appDetails, setAppDetails] = useState<Record<string, AppDetail>>({});

  useEffect(() => {
    search(query).then((results) => {
      setSearchResults(results);
    }).catch(() => {
      navigate('/404')
    });
  }, [query]);

  useEffect(() => {
    searchResults.forEach((result) => {
      getGameDetails(result.appid).then((appDetails) => {
        setAppDetails((prev) => 
          ({ ...prev, [result.appid]: appDetails[result.appid] })
        );
      }).catch(() => {
        navigate('/404')
      });
    });
  }, [searchResults]);

  return (
    <div className="w-full bg-steam-back">
      <div className="w-full max-w-5xl mx-auto flex flex-col z-10 min-h-screen">
        {searchResults.length > 0 && Object.values(appDetails).length > 0 && (
          <div className="flex flex-col mt-4 gap-3">
            <h1 className="text-center text-xl font-bold text-steam-white">
              Search results for "{query}"
            </h1>
            {searchResults.filter((result) => appDetails[result.appid]?.data).map((result) => (
              <Link key={result.appid} className="hover:scale-110 transition-transform duration-150 motion-reduce:transition-none flex flex-col items-center md:items-start md:flex-row bg-gradient-to-r from-white/10" to={`/app/${result.appid}`}>
                <img
                  className="shrink-0"
                  src={result.logo}
                  alt={result.name}
                />
                <div className="grow text-steam-white p-2">
                  <h3>
                    {result.name}
                  </h3>
                  <div className="flex flex-row items-center justify-start">
                    {appDetails[result.appid]?.data.platforms.windows && <AiFillWindows className="text-2xl" />}
                    {appDetails[result.appid]?.data.platforms.mac && <AiFillApple className="text-2xl" />}
                  </div>
                </div>
                <div className="grow" />
                <div className="flex flex-row items-center justify-start text-steam-white">
                  {appDetails[result.appid].data.price_overview && appDetails[result.appid].data.price_overview?.discount_percent != 0 ? (
                    <div className="flex">
                        <div className="w-16 bg-steam-green2 text-steam-green font-semibold text-2xl flex items-center justify-center">
                          -{appDetails[result.appid].data.price_overview?.discount_percent}%
                        </div>
                        <div className="w-16 flex flex-col items-end px-2 justify-center bg-steam-grey">
                          <p className="text-xs line-through font-light">
                            {Intl.NumberFormat(undefined, { style: 'currency', currency: appDetails[result.appid].data.price_overview.currency }).format(appDetails[result.appid].data.price_overview.initial / 100)}
                          </p>
                          <p className="text-sm text-steam-green font-light">
                            {Intl.NumberFormat(undefined, { style: 'currency', currency: appDetails[result.appid].data.price_overview.currency }).format(appDetails[result.appid].data.price_overview.final / 100)}
                          </p>
                        </div>
                    </div> 
                  ) : (
                    <div>
                      <p className="text-sm font-light">
                        {appDetails[result.appid].data.release_date.coming_soon ? (
                          'Coming Soon'
                        ) : (appDetails[result.appid].data.is_free ? (
                          'Free to Play'
                        ) : (
                          Intl.NumberFormat(undefined, { style: 'currency', currency: appDetails[result.appid].data.price_overview.currency }).format(appDetails[result.appid].data.price_overview.final / 100)
                        ))}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
        {searchResults.length === 0 && (
          <div className="flex flex-col">
            <div className="text-4xl text-center font-bold text-steam-white">
              No results found for "{query}"
            </div>
            <div className="text-2xl text-center font-bold text-steam-white">
              Try searching for something else
            </div>
          </div> 
        )}
      </div>
    </div>
  )
};

export default Search;