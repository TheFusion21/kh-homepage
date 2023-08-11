import React, { useEffect, useMemo, useState } from 'react';
import {
  getFeatured,
  getFeaturedCategories,
  TopSellers,
  Featured,
  FeaturedCategories,
  AppDetail,
  getGameDetails,
  ComingSoon,
} from 'SteamShopClone/steam';
import {
  AiFillWindows,
  AiFillApple,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const HomeTopSellers = ({ topSellers }: { topSellers: TopSellers }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = React.useRef<HTMLDivElement>(null);
  const [appDetails, setAppDetails] = useState<Record<number, AppDetail>>({});

  // make list of top sellers unique by id
  const uniqueTopSellers = useMemo(() => topSellers.items.reduce((acc, item) => {
    if (!acc.find((accItem) => accItem.id === item.id) && !item.name.includes('Steam Deck')) {
      acc.push(item);
    }
    return acc;
  }, [] as typeof topSellers.items), [topSellers]);
    
  useEffect(() => {
    if (slideRef.current) {
      setSlideWidth(slideRef.current.scrollWidth / uniqueTopSellers.length);
    }
  }, [slideRef, uniqueTopSellers]);

  useEffect(() => {
    uniqueTopSellers.forEach((item) => {
      getGameDetails(item.id).then((data) => {
        if (data[item.id].success === false) {
          return;
        }
        setAppDetails((prev) => ({ ...prev, [item.id]: data[item.id] }));
        console.log(data[item.id]);
      });
    });
  }, [uniqueTopSellers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % uniqueTopSellers.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [uniqueTopSellers]);


  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent">
      <h1 className="text-2xl text-center mb-2 text-steam-white shadow-black text-shadow-sm uppercase">
        Top Sellers
      </h1>
      {/* Slide Show */}
      <div className="overflow-hidden">
        <div className="w-full flex flex-nowrap transition-transform duration-1000" ref={slideRef} style={{ transform: `translateX(-${slideIndex * slideWidth}px)` }}>
          {uniqueTopSellers.map((item) => (
            <Link to={`/app/${item.id}`} className="min-w-full min-h-full flex flex-col md:flex-row" key={item.id}>
              <div  className="md:basis-3/4">
                <img src={item.large_capsule_image} alt={item.name} className="h-full w-full object-contain" />
              </div>
              <div className="shrink-0 grow md:grow-0 p-4 md:basis-1/4 text-steam-white text-xl font-semibold flex flex-col">
                <h1 className="whitespace-nowrap shadow-black text-shadow-sm"> {item.name}</h1>
                <div className="flex flex-row items-center justify-start">
                  {item.windows_available && <AiFillWindows className="text-2xl" />}
                  {item.mac_available && <AiFillApple className="text-2xl" />}
                </div>
                <p className="text-sm font-light">{appDetails[item.id]?.data.short_description}</p>
                <div className="w-full grid grid-cols-2 gap-2">
                  {appDetails[item.id]?.data.screenshots.filter((_, index) => index < 4).map((screenshot) => (
                    <img src={screenshot.path_thumbnail}  className="object-contain hover:scale-150 transition-transform duration-100" key={screenshot.id} />
                  ))}
                </div>
                <div className="grow" />
                <div className="flex flex-row items-center justify-start">
                  {item.discounted ? (
                    <div className="flex">
                        <div className="w-16 bg-steam-green2 text-steam-green font-semibold text-2xl flex items-center justify-center">
                          -{item.discount_percent}%
                        </div>
                        <div className="w-16 flex flex-col items-end px-2 justify-center bg-steam-grey">
                          <p className="text-xs line-through font-light">
                            {Intl.NumberFormat(undefined, { style: 'currency', currency: item.currency }).format(item.original_price / 100)}
                          </p>
                          <p className="text-sm text-steam-green font-light">
                            {Intl.NumberFormat(undefined, { style: 'currency', currency: item.currency }).format(item.final_price / 100)}
                          </p>
                        </div>
                    </div> 
                  ) : (
                    <div>
                      <p className="text-sm font-light">
                        {Intl.NumberFormat(undefined, { style: 'currency', currency: item.currency }).format(item.final_price / 100)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Slide Show Buttons */}
      <div className="flex flex-row justify-center py-3">
        {uniqueTopSellers.map((item, index) => (
          <button
            className={`w-5 h-3 rounded-md mx-1 transition-colors duration-500 ${index === slideIndex ? 'bg-white/50' : 'bg-white/20'}`}
            key={item.id}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  )
};

const HomeComingSoon = ({ comingSoon }: { comingSoon: ComingSoon }) => {
  const [appDetails, setAppDetails] = useState<Record<number, AppDetail>>({});
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = React.useRef<HTMLDivElement>(null);

  // generate a list of groups of 4
  const groups = comingSoon.items.reduce((acc, item, index) => {
    if (index % 4 === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, [] as typeof comingSoon.items[]);
  
  useEffect(() => {
    if (slideRef.current) {
      // check media query for mobile
      setSlideWidth(slideRef.current.scrollWidth / groups.length);
        
    }
  }, [slideRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % groups.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [groups]);

  const handleMouseOver = (i: number, j: number) => {
    const item = groups[i][j];
    if (!appDetails[item.id]) {
      getGameDetails(item.id).then((data) => {
        if (data[item.id].success === false) {
          return;
        }
        setAppDetails((prev) => ({ ...prev, [item.id]: data[item.id] }));
      });
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-md">
      <h1 className="text-2xl text-center mb-2 text-steam-white shadow-black text-shadow-sm uppercase">
        Coming Soon
      </h1>
      <div className="overflow-hidden">
        <div className="w-full flex flex-nowrap transition-transform duration-1000" ref={slideRef} style={{ transform: `translateX(-${slideIndex * slideWidth}px)` }}>
          {groups.map((group, i) => (
            <div className="min-w-full min-h-full grid grid-cols-2 md:grid-cols-4">
              {group.map((item, j) => (
                <Link to={`/app/${item.id}`} className="min-h-full flex flex-col items-center relative" key={item.id} onMouseOver={() => handleMouseOver(i, j)}>
                  <div  className="">
                    <img src={item.large_capsule_image} alt={item.name} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h1 className="text-steam-white">
                      {item.name}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Slide Show Buttons */}
      <div className="flex flex-row justify-center py-3">
        {groups.map((item, index) => (
          <button
            className={`w-5 h-3 rounded-md mx-1 transition-colors duration-500 ${index === slideIndex ? 'bg-white/50' : 'bg-white/20'}`}
            key={item.id}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  )
};

const Home = () => {
  const [featured, setFeatured] = React.useState<Featured | null>(null);
  const [featuredCategories, setFeaturedCategories] = React.useState<FeaturedCategories | null>(null);


  useEffect(() => {
    getFeatured().then((data) => {
      setFeatured(data);
    });
    getFeaturedCategories().then((data) => {
      setFeaturedCategories(data);
    });
  }, []);

  if (!featured || !featuredCategories) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center w-full bg-steam-back">
      {/* Top Sellers */}
      <HomeTopSellers topSellers={featuredCategories.top_sellers} />
      <HomeComingSoon comingSoon={featuredCategories.coming_soon} />
    </div>
  );
};

export default Home;