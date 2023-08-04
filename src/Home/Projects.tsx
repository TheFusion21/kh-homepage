import React from 'react';
import {
  BsLink45Deg,
} from 'react-icons/bs';

const Projects = () => (
  <>
    <span>
      <h1 className="uppercase text-xl sm:text-2xl md:text-3xl mb-3 text-green-600 text-center" id="overtheedge">
        // Over the Edge
        <a href="https://brunchtime-studio.itch.io/over-the-edge" className="text-sky-400" target="_blank" rel="noreferrer">
          <BsLink45Deg className="inline-block w-6 h-6" aria-label="link to over the edge" />
        </a>
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:max-w-md mx-auto md:max-w-lg lg:max-w-xl xl:max-w-none">
        <img src="https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4MzgucG5n/original/h7HSEe.png" alt="over the edge" className="h-full w-full object-contain" />
        <img src="https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4NDYucG5n/original/DXQaKI.png" alt="over the edge" className="h-full w-full object-contain" />
        <span className="col-span-full sm:col-span-1">
        A game project made at the Games Academy in a team of 4.<br />My responsibilities:<br />Multiplayer<br />Some UI<br />Technical art<br />character animation/control
        </span>
      </div>
    </span>
    <span>
      <h1 className="uppercase text-xl sm:text-2xl md:text-3xl mb-3 text-green-600 text-center" id="aeio">
        // AEIO
        <a href="https://leafblower-studio.itch.io/aeio" className="text-sky-400" target="_blank" rel="noreferrer">
          <BsLink45Deg className="inline-block w-6 h-6" aria-label="link to aeio" />
        </a>
      </h1>
      <div className="md:basis-1/4 grid grid-cols-1 sm:grid-cols-2 gap-2  sm:max-w-md mx-auto md:max-w-lg lg:max-w-xl xl:max-w-none">
        <img src="https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMDguanBn/original/LGj31C.jpg" alt='aeio' className="h-full w-full object-contain max-h-[25vh] sm:max-h-[65vh]" />
        <span className="col-span-1 sm:col-span-full order-3">
          A game project made at the Games Academy in a team of 4. My responsibilities:<br />Multiplayer<br />Some UI<br />Technical art<br />character animation/control
        </span>
        <img src="https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMDguanBn/original/LGj31C.jpg" alt='aeio' className="h-full w-full object-contain max-h-[25vh] sm:max-h-[65vh]" />
      </div>
    </span>
  </>
);

export default Projects;