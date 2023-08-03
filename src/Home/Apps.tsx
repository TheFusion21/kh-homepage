import React from 'react';
import {
  BsArrowDown,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const AppList = [
  {
    imgUrl: "https://placehold.co/480x960",
    title: "Weather App",
    link: "/weather-app",
  },
  {
    imgUrl: "/calculator.png",
    title: "Calculator",
    link: "/calculator",
  }
]
const Apps = ({ height } : {height: number}) => {

  return (
    <div className="w-screen flex items-center justify-center flex-col px-4 sm:px-8 md:px-12 lg:px-16 snap-start" style={{ height }} id="apps">
      <div className="shrink-0 grow flex flex-col items-center justify-center w-full">
        <span className="uppercase text-xl sm:text-3xl mb-3">
          React Apps
        </span>
        <div className="max-w-[1280px] w-full">
          <div className="w-full h-full grid grid-cols-3 md:grid-cols-6 gap-2 uppercase">
            {AppList.map((app) => (
              <Link className="aspect-[9/21] w-full flex flex-col items-center" key={app.title} to={app.link}>
                <div className="grow hover:scale-110 transition-transform w-full">
                  <img src={app.imgUrl} alt="Screenshot" className="w-full h-full object-contain" />
                </div>
                <span>
                  {app.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BsArrowDown
        className="w-8 h-8 animate-bounce shrink-0"
      />
    </div>
  )
};

export default Apps;