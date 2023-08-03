import React, { useEffect, useMemo, useState } from 'react';
import {
  BsGrid,
} from 'react-icons/bs';
import {
  TbRulerMeasure,
  TbCube,
  TbCalculator,
  TbWeight,
  TbTemperature,
  TbBrandSpeedtest,
  TbDatabase
} from 'react-icons/tb';
import { BsLightningCharge } from 'react-icons/bs';
import { BiArea } from 'react-icons/bi';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import Calculator from './Calculator';
import Length from './Length';
import Currency from './Currency';
import Volume from './Volume';
import Area from './Area';
import Weight from './Weight';
import Temperature from './Temperature';
import Speed from './Speed';
import Energy from './Energy';
import Bytes from './Bytes';

import isMobile from '@hooks/isMobile';

const App: React.FC = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [menu, setMenu] = useState(false);
  const [subApp, setSubApp] = useState(0);

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

  const subApps = useMemo(() => [
    {
      icon: <TbCalculator className="w-8 h-8" />,
      app: <Calculator isLandscape={isLandscape} />,
      title: 'Calculator',
    },
    {
      icon: <TbRulerMeasure className="w-8 h-8" />,
      app: <Length isLandscape={isLandscape} />,
      title: 'Length',
    },
    {
      icon: <MdOutlineCurrencyExchange className="w-8 h-8" />,
      app: <Currency isLandscape={isLandscape} />,
      title: 'Currency',
    },
    {
      icon: <TbCube className="w-8 h-8" />,
      app: <Volume isLandscape={isLandscape} />,
      title: 'Volume',
    },
    {
      icon: <BiArea className="w-8 h-8" />,
      app: <Area isLandscape={isLandscape} />,
      title: 'Area',
    },
    {
      icon: <TbWeight className="w-8 h-8" />,
      app: <Weight isLandscape={isLandscape} />,
      title: 'Weight',
    },
    {
      icon: <TbTemperature className="w-8 h-8" />,
      app: <Temperature isLandscape={isLandscape} />,
      title: 'Temperature',
    },
    {
      icon: <TbBrandSpeedtest className="w-8 h-8" />,
      app: <Speed isLandscape={isLandscape} />,
      title: 'Speed',
    },
    {
      icon: <BsLightningCharge className="w-8 h-8" />,
      app: <Energy isLandscape={isLandscape} />,
      title: 'Energy',
    },
    {
      icon: <TbDatabase className="w-8 h-8" />,
      app: <Bytes isLandscape={isLandscape} />,
      title: 'Bytes',
    }
  ], [isLandscape]);
  

  return (
    <div className="flex justify-center items-center select-none bg-zinc-950" style={{height: window.innerHeight, width: window.innerWidth}}>
      <div className={`flex flex-col w-full h-full relative overflow-hidden bg-zinc-900 ${!isMobile() ? 'max-w-[420px] max-h-[930px]' : ''}`}>
        {/* MenuBar */}
        <div className={`h-12 ${isLandscape ? 'hidden' : 'flex'} flex-row items-center justify-center bg-zinc-700 w-full px-1`}>
          <div className="grow" />
          <div className="rounded-full hover:bg-white/5 active:bg-white/10" onClick={() => setMenu(!menu)} aria-label="Menu">
            <BsGrid className="w-10 h-10 p-2" />
          </div>
        </div>
        {subApps[subApp].app}
        {/* Menu */}
        <div className={`absolute w-full h-full bg-zinc-800 ${isLandscape ? 'top-0' : 'top-12'} transition-transform flex justify-center items-center`} style={{ transform: `translateX(${menu ? '0%' : '100%'})` }}>
          <div className={`w-full grid grid-cols-3 ${isLandscape ? 'sm:grid-cols-5' : ''} gap-2 p-2`}>
            {subApps.map((subApp, i) => (
              <button
                key={subApp.title}
                className="flex flex-col items-center justify-center hover:bg-white/5 active:bg-white/10 rounded-lg p-4 gap-2"
                onClick={() => {setSubApp(i); setMenu(false)}}
              >
                {subApp.icon}
                <span>{subApp.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default App;