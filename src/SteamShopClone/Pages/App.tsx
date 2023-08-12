import { AppDetail, getGameDetails } from 'SteamShopClone/steam';
import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AiFillWindows,
  AiFillApple,
} from 'react-icons/ai';
const Home = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const [appDetails, setAppDetails] = useState<AppDetail | null>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    getGameDetails(appId).then((appDetails) => {
      if(!appDetails[appId]) navigate('/404');
      if(!appDetails[appId].data) navigate('/404');
      setAppDetails(appDetails[appId]);
    }).catch(() => {
      navigate('/404')
    });
  }, [appId]);

  const contentCount = useMemo(() => {
    return appDetails?.data?.screenshots.length + appDetails?.data?.movies?.length ?? 0;
  }, [appDetails]);

  useEffect(() => {
    const calcSlideWidth = () => {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.scrollWidth / contentCount);
      }
    }
    calcSlideWidth();
    window.addEventListener('resize', calcSlideWidth);
    return () => window.removeEventListener('resize', calcSlideWidth);
  }, [slideRef, contentCount]);

  const currentPlatform = useMemo(() => {
    const rWin = /Win16|Win32|Win64|Windows/i;
    const rMac = /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh|iPhone|iPad|iPod)/i;
    if (rWin.test(window.navigator.userAgent)) {
      return 'windows';
    }
    if (rMac.test(window.navigator.userAgent)) {
      return 'mac';
    }
    return 'linux';
  }, []);

  return (
    <div className="w-full bg-steam-back relative">
      {/* Background */}
      <div className="absolute left-0 right-0">
        <img
          className="w-full bg-top"
          src={appDetails?.data?.background}
          alt={appDetails?.data?.name}
        />
      </div>
      {appDetails && (
        <div className="w-full max-w-5xl mx-auto flex flex-col z-10 relative top-0" ref={slideRef}>
          {/* Title */}
          <h1 className="text-2xl text-center my-2 text-steam-white shadow-black text-shadow-sm uppercase">
            {appDetails.data?.name}
          </h1>
          {/* Image/Videos */}
          <div className="overflow-x-auto snap-x snap-mandatory flex flex-nowrap flex-row">
            {appDetails.data?.movies?.map((movie, i) => (
              <div className="min-w-full min-h-full snap-center">
                <video
                  className="w-full h-full object-cover"
                  src={movie.webm.max}
                  loop
                  muted
                  controls
                  autoPlay={i === 0}
                />
              </div>
            ))}
            {appDetails.data?.screenshots.map((screenshot) => (
              <div className="min-w-full min-h-full snap-center">
                <img
                  className="w-full h-full object-cover"
                  src={screenshot.path_full}
                  alt={screenshot.id.toString()}
                />
              </div>
            ))}
          </div>
          {/* Description */}
          <div className="flex md:flex-row flex-col-reverse pt-4 w-full gap-2 overflow-hidden">
            <div className="basis-2/3 shrink-0 p-2 flex flex-col bg-gradient-to-b from-black/20 to-black/0 rounded-md overflow-hidden pb-4">
              <h3 className="uppercase my-3 border-b border-steam-white/30 text-steam-white">
                About This Game
              </h3>
              <p
                dangerouslySetInnerHTML={{ __html: appDetails.data.about_the_game }}
                className="whitespace-normal text-steam-white"
              />
              <h3 className="uppercase my-3 border-b border-steam-white/30 text-steam-white">
                System Requirements
              </h3>
              <div className="grid grid-cols-2 gap-2 mt-2 text-steam-white text-sm">
                {currentPlatform === 'windows' && (
                  <>
                    <p dangerouslySetInnerHTML={{ __html: appDetails.data.pc_requirements.minimum }} />
                    <p dangerouslySetInnerHTML={{ __html: appDetails.data.pc_requirements.recommended }} />
                  </>
                )}
                {currentPlatform === 'mac' && (
                  <>
                    <p dangerouslySetInnerHTML={{ __html: appDetails.data.mac_requirements.minimum }} />
                    <p dangerouslySetInnerHTML={{ __html: appDetails.data.mac_requirements.recommended }} />
                  </>
                )}
                {currentPlatform === 'linux' && (
                  <>
                    <p dangerouslySetInnerHTML={{ __html: appDetails.data.linux_requirements.minimum }} />
                    <p dangerouslySetInnerHTML={{ __html: appDetails.data.linux_requirements.recommended }} />
                  </>
                )}

              </div>
              <span className="text-xs text-steam-white/20 my-3">
                {appDetails.data.legal_notice}
              </span>
            </div>
            {/* Side Bar which needs to be before the description on mobile */}
            <div className="flex flex-col gap-2 bg-gradient-to-b from-black/20 to-black/0 rounded-md overflow-hidden pb-4">
              {/* Thumbnail */}
              <div>
                <img
                  src={appDetails.data.header_image}
                  alt={appDetails.data.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Price */}
              <div className="flex w-full justify-between items-center px-4">
                <div className="flex flex-row items-center justify-start text-steam-white">
                  {appDetails.data.platforms.windows && <AiFillWindows className="text-2xl" />}
                  {appDetails.data.platforms.mac && <AiFillApple className="text-2xl" />}
                </div>
                <div className="flex flex-row items-center justify-start">
                  {appDetails.data.price_overview && appDetails.data.price_overview?.discount_percent != 0 ? (
                    <div className="flex">
                        <div className="w-16 bg-steam-green2 text-steam-green font-semibold text-2xl flex items-center justify-center">
                          -{appDetails.data.price_overview?.discount_percent}%
                        </div>
                        <div className="w-16 flex flex-col items-end px-2 justify-center bg-steam-grey">
                          <p className="text-xs line-through font-light">
                            {Intl.NumberFormat(undefined, { style: 'currency', currency: appDetails.data.price_overview.currency }).format(appDetails.data.price_overview.initial / 100)}
                          </p>
                          <p className="text-sm text-steam-green font-light">
                            {Intl.NumberFormat(undefined, { style: 'currency', currency: appDetails.data.price_overview.currency }).format(appDetails.data.price_overview.final / 100)}
                          </p>
                        </div>
                    </div> 
                  ) : (
                    <div>
                      <p className="text-sm font-light">
                        {appDetails.data.release_date.coming_soon ? (
                          'Coming Soon'
                        ) : (appDetails.data.is_free ? (
                          'Free to Play'
                        ) : (
                          Intl.NumberFormat(undefined, { style: 'currency', currency: appDetails.data.price_overview.currency }).format(appDetails.data.price_overview.final / 100)
                        ))}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Tags */}
              <div className="grid grid-cols-2 px-4">
                <span className="uppercase text-steam-grey">
                  Release Date:
                </span>
                <span className="text-steam-white">
                  {appDetails.data.release_date.coming_soon ? (
                    'Coming Soon'
                  ) : (
                    appDetails.data.release_date.date
                  )}
                </span>
                <div className="col-span-2 py-2" />
                <span className="uppercase text-steam-grey">
                  Developers:
                </span>
                <span className="text-steam-white">
                  {appDetails.data.developers.join(', ')}
                </span>
                <span className="uppercase text-steam-grey">
                  Publishers:
                </span>
                <span className="text-steam-white">
                  {appDetails.data.publishers.join(', ')}
                </span>
                {appDetails.data.website && (
                  <>
                    <div className="col-span-2 py-2" />
                    <span className="uppercase text-steam-grey">
                    Website:
                  </span>
                  <span className="text-steam-blue truncate">
                    <a href={appDetails.data.website} target="_blank" rel="noreferrer">
                      {appDetails.data.website}
                    </a>
                  </span>
                  </> 
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;