import React, { useEffect, useMemo, useState } from 'react';
import {
  BsGrid,
} from 'react-icons/bs';
import {
  PiNumberZero,
  PiNumberOne,
  PiNumberTwo,
  PiNumberThree,
  PiNumberFour,
  PiNumberFive,
  PiNumberSix,
  PiNumberSeven,
  PiNumberEight,
  PiNumberNine,
} from 'react-icons/pi';

import {
  FiDelete
} from 'react-icons/fi';
import Calculator from './Calculator';

const App = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [menu, setMenu] = useState(false);
  const [subApp, setSubApp] = useState(0);

  useEffect(() => {
    const getOrientation = () => {
      switch (screen.orientation.type) {
        case "landscape-primary":
        case "landscape-secondary":
          setIsLandscape(true);
          break;
        default:
          setIsLandscape(false);
          break;
      }
    };
    getOrientation();
    window.addEventListener("orientationchange", getOrientation);
    return () => window.removeEventListener("orientationchange", getOrientation);
  }, []);

  const subApps = useMemo(() => [
    <Calculator isLandscape={isLandscape} />
  ], [isLandscape]);
  

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="max-w-[640px] max-h-[1024px] flex flex-col w-full h-full relative shadow-lg overflow-hidden bg-zinc-900">
        {/* MenuBar */}
        <div className={`h-12 ${isLandscape ? 'hidden' : 'flex'} flex-row items-center justify-center bg-zinc-700 w-full px-1`}>
          <div className="grow" />
          <div className="rounded-full hover:bg-white/5 active:bg-white/10" onClick={() => setMenu(!menu)} aria-label="Menu">
            <BsGrid className="w-10 h-10 p-2" />
          </div>
        </div>
        {subApps[subApp]}
        {/* Menu */}
        <div className="absolute w-full h-full bg-zinc-800 top-12 transition-transform" style={{ transform: `translateX(${menu ? '0%' : '100%'})` }}>

        </div>
      </div>
    </div>
  )
};

export default App;