import React from 'react';
import { Link } from 'react-router-dom';

const AppList = [
  {
    imgUrl: "/weather.png",
    title: "Weather App",
    link: "/weather",
  },
  {
    imgUrl: "/calculator.png",
    title: "Calculator",
    link: "/calculator",
  }
];

const Apps = () => {

  return (
    <span>
      <h1 className="uppercase text-xl sm:text-2xl md:text-3xl mb-3 text-green-600 text-center" id="apps">
        // React Apps
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 uppercase">
        {AppList.map((app) => (
          <Link className="w-full flex flex-col items-center" key={app.title} to={app.link}>
            <div className="grow hover:scale-110 transition-transform w-full">
              <img src={app.imgUrl} alt="Screenshot" className="w-full h-full object-contain" />
            </div>
            <span>
              {app.title}
            </span>
          </Link>
        ))}
      </div>
    </span>
  )
};

export default Apps;