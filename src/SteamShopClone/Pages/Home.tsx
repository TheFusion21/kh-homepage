import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  getFeatured,
  getFeaturedCategories,
  Featured,
  FeaturedCategories,
  AppDetail,
  getGameDetails,
  Category,
} from 'SteamShopClone/steam';
import {
  AiFillWindows,
  AiFillApple,
} from 'react-icons/ai';
import { Link, ScrollRestoration } from 'react-router-dom';
import AnimateHeight from 'react-animate-height';

const HomeFeatured = ({ featured }: { featured: Featured }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [appDetails, setAppDetails] = useState<Record<number, AppDetail>>({});
  const [isMouseOver, setIsMouseOver] = useState(false);

  const currentPlatform = useMemo(() => {
    const rWin = /Win16|Win32|Win64|Windows/i;
    const rMac = /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh|iPhone|iPad|iPod)/i;
    if (rWin.test(window.navigator.platform)) {
      return 'windows';
    }
    if (rMac.test(window.navigator.platform)) {
      return 'mac';
    }
    return 'linux';
  }, []);

  const featuredFromPlatform = useMemo(() => {
    switch (currentPlatform) {
      case 'windows':
        return featured.featured_win;
      case 'mac':
        return featured.featured_mac;
      case 'linux':
      default:
        return featured.featured_linux;
    }
  }, [featured, currentPlatform]);

  useEffect(() => {
    const calcSlideWidth = () => {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.scrollWidth / featuredFromPlatform.length);
      }
    }
    calcSlideWidth();
    window.addEventListener('resize', calcSlideWidth);
    return () => window.removeEventListener('resize', calcSlideWidth);
  }, [slideRef, featuredFromPlatform]);

  useEffect(() => {
    featuredFromPlatform.forEach((item) => {
      getGameDetails(item.id).then((data) => {
        if (data[item.id].success === false) {
          return;
        }
        setAppDetails((prev) => ({ ...prev, [item.id]: data[item.id] }));
        console.log(data[item.id]);
      });
    });
  }, [featuredFromPlatform]);

  useEffect(() => {
    if (isMouseOver) {
      return;
    }
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % featuredFromPlatform.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredFromPlatform, isMouseOver]);


  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent">
      <h1 className="text-2xl text-center my-2 text-steam-white shadow-black text-shadow-sm uppercase">
        FEATURED & RECOMMENDED
      </h1>
      {/* Slide Show */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <div className="w-full flex flex-nowrap transition-transform motion-reduce:transition-none duration-1000" ref={slideRef} style={{ transform: `translateX(-${slideIndex * slideWidth}px)` }}>
          {featuredFromPlatform.map((item) => (
            <Link
              to={`/app/${item.id}`}
              className="min-w-full min-h-full flex flex-col md:flex-row" key={item.id}
            >
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
                    <img src={screenshot.path_thumbnail}  className="object-contain hover:scale-150 transition-transform duration-100 motion-reduce:transition-none" key={screenshot.id} />
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
                        {item.final_price === 0 ? (
                          'Free to Play'
                        ) : (
                          Intl.NumberFormat(undefined, { style: 'currency', currency: item.currency }).format(item.final_price / 100)
                        )}
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
        {featuredFromPlatform.map((item, index) => (
          <button
            className={`w-4 h-3 rounded-sm mx-1 transition-colors motion-reduce:transition-none duration-500 ${index === slideIndex ? 'bg-white/50' : 'bg-white/20'}`}
            key={item.id}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  )
};

const HomeFeaturedCategories = ({ featuredCategories }: { featuredCategories: FeaturedCategories }) => {
  const [tab, setTab] = useState<'specials' | 'coming_soon' | 'top_sellers' | 'new_releases'>('specials');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [appDetails, setAppDetails] = useState<Record<number, AppDetail>>({});

  const items = useMemo((): typeof featuredCategories.coming_soon.items => {
    return (featuredCategories[tab]?.items ?? []).filter((item) => !item.name.includes('Steam'))
  }, [featuredCategories, tab]);

  useEffect(() => {
    if (hoverIndex !== null) {
      const item = items[hoverIndex];
      if (!appDetails[item.id]) {
        getGameDetails(item.id).then((data) => {
          setAppDetails((prev) => ({ ...prev, [item.id]: data[item.id] }));
        });
      }
    }
  }, [hoverIndex, items, appDetails]);


  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-row justify-center flex-wrap w-full overflow-x-auto text-steam-white">
        <button className={`p-1 whitespace-nowrap transition-colors motion-reduce:transition-none duration-150 hover:text-steam-white ${tab === 'specials' ? 'bg-white/10' : 'text-steam-blue'}`} onClick={() => setTab('specials')}>
          Specials
        </button>
        <button className={`p-1 whitespace-nowrap transition-colors motion-reduce:transition-none duration-150 hover:text-steam-white ${tab === 'coming_soon' ? 'bg-white/10' : 'text-steam-blue'}`} onClick={() => setTab('coming_soon')}>
          Coming Soon
        </button>
        <button className={`p-1 whitespace-nowrap transition-colors motion-reduce:transition-none duration-150 hover:text-steam-white ${tab === 'top_sellers' ? 'bg-white/10' : 'text-steam-blue'}`} onClick={() => setTab('top_sellers')}>
          Top Sellers
        </button>
        <button className={`p-1 whitespace-nowrap transition-colors motion-reduce:transition-none duration-150 hover:text-steam-white ${tab === 'new_releases' ? 'bg-white/10' : 'text-steam-blue'}`} onClick={() => setTab('new_releases')}>
          New Releases
        </button>
      </div>
      {/* Tab Content */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        {items?.map((item, i) => (
          <Link
            key={item.id}
            onMouseOver={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            className="flex flex-col hover:bg-white/40 text-steam-white hover:text-steam-black transition-colors duration-150"
            to={`/app/${item.id}`}
          >
            <div className="flex">
              <div className="basis-1/2">
                <img src={item.large_capsule_image} className="object-contain" />
              </div>
              <div className="basis-1/2 grow py-1 px-2 md:py-2 flex flex-col">
                <h2 className="text-sm md:text-base">
                  {item.name}
                </h2>
                <div className="grow" />
                <div className="flex">
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
                          {tab === 'coming_soon' ? (
                            'Coming Soon'
                          ) : (item.final_price === 0 ? (
                            'Free to Play'
                          ) : (
                            Intl.NumberFormat(undefined, { style: 'currency', currency: item.currency }).format(item.final_price / 100)
                          ))}
                        </p>
                      </div>
                    )}
                  </div>
              </div> 
              </div>
            </div>
            <AnimateHeight
              duration={150}
              height={hoverIndex === i && appDetails[item.id] && appDetails[item.id].success ? 'auto' : 0}
              className=""
            >
              {appDetails[item.id]?.data && (
                <div className="flex pt-2 items-start">
                  <div className="basis-1/2 grid grid-cols-2 gap-2 pb-2">
                    {appDetails[item.id].data.screenshots.slice(0, 4).map((screenshot) => (
                      <img
                        key={screenshot.id}
                        src={screenshot.path_full}
                        className="object-contain hover:scale-150 transition-transform duration-100 motion-reduce:transition-none"
                      />
                    ))}
                  </div>
                  <div className="pl-2 pb-2 pr-2 basis-1/2">
                    <p className="text-steam-black">
                      {appDetails[item.id].data.short_description}
                    </p>
                  </div>
                </div>
              )}
            </AnimateHeight>
          </Link>
        ))}
      </div>
    </div>
  );
};

const HomeCategories = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [splitCount, setSplitCount] = useState(4);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const categories: Category[] = [
    'puzzle_matching',
    'exploration_open_world',
    'rogue_like_rogue_lite',
    'action',

    'horror',
    'science_fiction',
    'sports',
    'anime',

    'survival',
    'casual',
    'rpg',
    'adventure',

    'story_rich',
    'visual_novel',
    'racing',
    'strategy_cities_settlements',

    'simulation',
    'fighting_martial_arts',
    'strategy',
    'puzzle_matching',
  ];

  useEffect(() => {
    const calcSplitCount = () => {
      let sp = 4;
      if (matchMedia('(max-width: 768px)').matches) {
        sp = 2;
      }
      setSplitCount(sp);
    }
    calcSplitCount();
    window.addEventListener('resize', calcSplitCount);
    return () => window.removeEventListener('resize', calcSplitCount);
  }, []);

  const groups = useMemo(() => {
    // split into groups of 4
    const g = [];
    for (let i = 0; i < categories.length; i += splitCount) {
      g.push(categories.slice(i, i + splitCount));
    }
    return g;
  }, [splitCount])

  useEffect(() => {
    const calcSlideWidth = () => {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.scrollWidth / groups.length);
      }
    }
    calcSlideWidth();
    window.addEventListener('resize', calcSlideWidth);
    return () => window.removeEventListener('resize', calcSlideWidth);
  }, [slideRef, groups]);

  useEffect(() => {
    if (isMouseOver) {
      return;
    }
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % groups.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [groups, isMouseOver, slideIndex]);

  

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl text-center mt-2 text-steam-white shadow-black text-shadow-sm uppercase">
        FEATURED & RECOMMENDED
      </h1>
      <div
        className="overflow-hidden py-3"
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <div className="w-full flex flex-nowrap transition-transform motion-reduce:transition-none duration-1000" ref={slideRef} style={{ transform: `translateX(-${slideIndex * slideWidth}px)` }}>
          {groups.map((group, i) => (
            <div className="min-w-full grid grid-cols-2 md:grid-cols-4" key={i}>
              {group.map((category) => (
                <Link key={category} to={`/category/${category}`} className="min-w-1/4 shrink-0 hover:scale-110 transition-transform motion-reduce:transition-none z-10">
                  <div className="px-1">
                    <img src={`https://store.steampowered.com/categories/homepageimage/category/${category}?cc=us&l=english`} alt={category} />
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
            className={`w-4 h-3 rounded-sm mx-1 transition-colors motion-reduce:transition-none duration-500 ${index === slideIndex ? 'bg-white/50' : 'bg-white/20'}`}
            key={item.id}
            onClick={() => setSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  )
};

const Home = () => {
  const [featured, setFeatured] = useState<Featured | null>(null);
  const [featuredCategories, setFeaturedCategories] = useState<FeaturedCategories | null>(null);


  useEffect(() => {
    getFeatured().then((data) => {
      setFeatured(data);
    });
    getFeaturedCategories().then((data) => {
      setFeaturedCategories(data);
    });
  }, []);

  if (!featured || !featuredCategories) {
    return <div className="bg-steam-back min-h-screen">Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center w-full bg-steam-back">
      {/* Featured */}
      <HomeFeatured featured={featured} />
      {/* Featured Categories */}
      <HomeFeaturedCategories featuredCategories={featuredCategories} />
      {/* Categories */}
      <HomeCategories />
      <ScrollRestoration />
    </div>
  );
};

export default Home;