import React, { useEffect, useMemo, useState } from 'react';
import isMobile from '../utils/isMobile';
import {
  TbSearch,
  TbGps,
} from 'react-icons/tb';
const App = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const getOrientation = () => {
      if (!isMobile()) {
        setIsLandscape(false);
      } else {
        switch (screen.orientation.type) {
          case "landscape-primary":
          case "landscape-secondary":
            setIsLandscape(true);
            break;
          default:
            setIsLandscape(false);
            break;
        }
      }
    };
    getOrientation();
    window.addEventListener("orientationchange", getOrientation);
    window.addEventListener("resize", getOrientation);
    return () => {
      window.removeEventListener("orientationchange", getOrientation);
      window.removeEventListener("resize", getOrientation);
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen select-none">
      <div className={`flex flex-col w-full h-full items-center relative overflow-hidden shadow-lg bg-sky-600 ${!isMobile() ? 'max-w-[420px] max-h-[930px]' : ''}`}>
        {/* Searchbar */}
        <div className="w-full max-w-lg flex flex-row bg-sky-800 text-sky-100 sm:text-lg">
          <input type="text" className="grow bg-transparent border-0 outline-none h-full pl-2 pr-1" />
          <TbSearch className="w-10 h-10 p-1" />
          <TbGps className="w-10 h-10 p-1" />
        </div>
      </div>
    </div>
  )
};

export default App;