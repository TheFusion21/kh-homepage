import React, { useEffect, useRef } from 'react';

const Carousel = ({ urls, className } : { urls: string[], className: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(ref.current?.scrollWidth || 0);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);


  return (
    <div ref={ref} className={className}>
      <div className="flex flex-row flex-nowrap gap-4 w-full overflow-x-auto h-full justify-center">
        {urls.map((url, i) => (
          <div style={{ maxWidth:width }} className="h-full shrink-0" key={url}>
            <img
              src={url}
              alt={`carousel image ${i}`}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export default Carousel;