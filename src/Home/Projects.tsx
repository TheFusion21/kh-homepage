import React from 'react';
import {
  BsArrowDown,
  BsLink45Deg,
} from 'react-icons/bs';


const Projects = ({ height }: { height: number }) => (
  <>
    <div className="w-screen flex items-center justify-center flex-col snap-start" style={{ height }}>
      <div className="shrink-0 grow flex flex-col items-center justify-center w-full">
        <span className="uppercase text-xl sm:text-3xl mb-3">
          Projects
        </span>
        <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-2 px-2 md:gap-6 md:px-6">
          <span className="uppercase text-lg sm:text-xl text-center col-span-full">
            Over the Edge
            <a href="https://brunchtime-studio.itch.io/over-the-edge" className="text-sky-400" target="_blank" rel="noreferrer">
              <BsLink45Deg className="inline-block w-6 h-6" aria-label="link to over the edge" />
            </a>
          </span>
          <img src="https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4MzgucG5n/original/h7HSEe.png" alt="Ingame screenshot 1" className="w-full mx-auto" />
          <img src="https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4NDYucG5n/original/DXQaKI.png" alt="Ingame screenshot 2" className="w-full mx-auto" />
          <div className="flex flex-col col-span-full md:col-span-1">
            <span>
              A game project made at the Games Academy in a team of 4. My responsibilities:<br />Multiplayer<br />Some UI<br />Technical art<br />character animation/control
            </span>
          </div>
        </div>
      </div>
      <BsArrowDown
        className="w-8 h-8 animate-bounce"
      />
    </div>
    <div className="w-screen flex items-center justify-center flex-col snap-start" style={{ height }}>
      <div className="shrink-0 grow flex flex-col items-center justify-center w-full">
        <span className="uppercase text-xl sm:text-3xl mb-3">
          Projects
        </span>
        <div className="grid grid-cols-2 w-full gap-2 px-2 md:gap-6 md:px-6">
          <span className="uppercase text-lg sm:text-xl text-center col-span-full">
            AEIO
            <a href="https://leafblower-studio.itch.io/aeio" className="text-sky-400" target="_blank" rel="noreferrer">
              <BsLink45Deg className="inline-block w-6 h-6" aria-label="link to aeio" />
            </a>
          </span>
          <img src="https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMDguanBn/original/LGj31C.jpg" alt="Ingame screenshot 1" className="col-span-full md:col-span-1 w-full mx-auto" />
          <div className="flex flex-col col-span-full md:col-span-1">
            <span>
              A game project made at the Games Academy in a team of 4. My responsibilities:<br />Multiplayer<br />Some UI<br />Technical art<br />character animation/control
            </span>
          </div>
          <img src="https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMTAuanBn/original/vTly2W.jpg" alt="Ingame screenshot 2" className="row-start-3 md:row-start-auto col-span-full md:col-span-1 w-full mx-auto" />
        </div>
      </div>
      <BsArrowDown
        className="w-8 h-8 animate-bounce"
      />
    </div>
  </>
);

export default Projects;