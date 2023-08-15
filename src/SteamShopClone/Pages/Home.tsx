import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  FeaturedCategories,
  getFeaturedCategories,
  GameDetails,
  getGameDetails,
} from 'SteamShopClone/steam';
import {
  AiFillWindows,
  AiFillApple,
  AiFillCaretLeft,
  AiFillCaretRight,
} from 'react-icons/ai';
import { Link, ScrollRestoration } from 'react-router-dom';
import AnimateHeight from 'react-animate-height';

const FeaturedCategoriesSection = () => {
  const [featured, setFeatured] = useState<FeaturedCategories | null>(null);
  const [details, setDetails] = useState<Record<number, GameDetails>>({});
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    getFeaturedCategories().then(setFeatured);
  }, []);

  useEffect(() => {
    const calcSlideWith = () => {
      if (slideRef.current && featured) {
        setSlideWidth(slideRef.current.scrollWidth / featured.new_releases.items.length);
        console.log(slideRef.current.scrollWidth / featured.new_releases.items.length)
      }
    }
    window.addEventListener('resize', calcSlideWith);
    calcSlideWith();
    return () => window.removeEventListener('resize', calcSlideWith);
  }, [slideRef, featured]);

  useEffect(() => {
    if (featured) {
      const ids = [
        ...featured.coming_soon.items,
        ...featured.specials.items,
        ...featured.top_sellers.items,
        ...featured.new_releases.items,
      ].map((item) => item.id);
      ids.forEach((id) => {
        getGameDetails(id).then((details) => {
          setDetails((prev) => ({ ...prev, [id]: details }));
        });
      });
    }
  }, [featured]);

  const categories = useMemo(() => featured ? [
    featured.coming_soon,
    featured.specials,
    featured.top_sellers,
    ] : [],
  [featured]);

  //const mappedCategories = useMemo(() => categories.map((category, index) => (
  //  <section aria-label={category.name} key={category.id} className="flex flex-col items-center">
  //    <h1 className="text-steam-white shadow-black/20 text-shadow-lg font-bold text-2xl uppercase my-3">
  //      {category.name}
  //    </h1>
  //    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //      {category.items.map((item) => (
  //        <Link to={`/app/${item.id}`} key={item.id} className="hover:scale-110 transition-transform motion-reduce:transition-none duration-150">
  //          <img src={item.header_image} alt={item.name} />
  //          <div className="bg-steam-blue">
  //            asdasd
  //          </div>
  //        </Link>
  //      ))}
  //    </div>
  //  </section>
  //)), [categories]);

  const new_releases = useMemo(() => featured ? (
    <section aria-label={featured.new_releases.name} className="flex flex-col items-center">
      <h1 className="text-steam-white shadow-black/20 text-shadow-lg font-bold text-2xl uppercase my-3">
        {featured.new_releases.name}
      </h1>
      <div className="flex flex-row w-full items-center gap-2">
        <button
          className="w-8 h-24 bg-gradient-to-l from-black/5 to-black/25 shrink-0 text-black hover:text-steam-white transition-colors motion-reduce:transition-none duration-100"
          aria-label="previous"
          onClick={() => setSlideIndex((prev) => prev === 0 ? featured.new_releases.items.length - 1 : prev - 1)}
        >
          <AiFillCaretLeft className="w-full h-full" />
        </button>
        <div className="overflow-hidden grow">
          <div className="flex flex-row flex-nowrap transition-transform motion-reduce:transition-none duration-500" ref={slideRef} style={{ transform: `translateX(-${slideIndex * slideWidth}px)` }}>
            {featured.new_releases.items.map((item) => (
              <Link to={`/app/${item.id}`} key={item.id} className="min-w-full min-h-full flex flex-row">
                <img src={item.header_image} alt={item.name} className="basis-3/4 shadow-black/25 shadow-md"/>
                <div className="flex flex-col grow my-1 bg-black/20 shadow-black/25 shadow-md">
                  <h2 className="text-steam-white font-semibold text-xl p-3">
                    {item.name}
                  </h2>
                  <div>
                    
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <button
          className="w-8 h-24 bg-gradient-to-r from-black/5 to-black/25 shrink-0 text-black hover:text-steam-white transition-colors motion-reduce:transition-none duration-100"
          aria-label="next"
          onClick={() => setSlideIndex((prev) => prev === featured.new_releases.items.length - 1 ? 0 : prev + 1)}
        >
          <AiFillCaretRight className="w-full h-full" />
        </button>
      </div>
    </section>
  ) : null, [featured, slideIndex, slideWidth]);

  return new_releases;
};
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-steam-back">
      <div className="w-full max-w-5xl mx-auto">
        <FeaturedCategoriesSection />
      </div>
    </div>
  );
};

export default Home;