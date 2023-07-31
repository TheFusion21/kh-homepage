import React from 'react';
import {
  BsArrowDown,
  BsLink45Deg,
} from 'react-icons/bs';
import Carousel from './Carousel';

const urls1 = [
  'https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4MzgucG5n/original/h7HSEe.png',
  'https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4NDYucG5n/original/DXQaKI.png',
  'https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4NDIucG5n/original/ozE36t.png',
];
const urls2 = [
  'https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMDguanBn/original/LGj31C.jpg',
  'https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMTAuanBn/original/vTly2W.jpg',
];
const Projects = ({ height }: { height: number }) => (
  <>
    <div className="w-full flex items-center justify-center flex-col snap-start" style={{ height }} id="project1">
      <div className="shrink-0 grow flex flex-col items-center justify-center w-full">
        <span className="uppercase text-xl sm:text-3xl mb-3">
          Projects
        </span>
        <span className="uppercase text-lg sm:text-xl text-center">
          Over the Edge
          <a href="https://brunchtime-studio.itch.io/over-the-edge" className="text-sky-400" target="_blank" rel="noreferrer">
            <BsLink45Deg className="inline-block w-6 h-6" aria-label="link to over the edge" />
          </a>
        </span>
        <Carousel className="w-full grow max-w-[1920px] max-h-[55vh] md:max-h-[50vh] px-4 md:px-6" urls={urls1} />
        <span className="px-4 md:px-6">
          A game project made at the Games Academy in a team of 4.<br />My responsibilities:<br />Multiplayer<br />Some UI<br />Technical art<br />character animation/control
        </span>
      </div>
      <BsArrowDown
        className="w-8 h-8 animate-bounce shrink-0"
      />
    </div>
    <div className="w-full flex items-center justify-center flex-col snap-start" style={{ height }} id="project2">
      <div className="shrink-0 grow flex flex-col items-center justify-center w-full">
        <span className="uppercase text-xl sm:text-3xl mb-3">
          Projects
        </span>
        <span className="uppercase text-lg sm:text-xl text-center">
          AEIO
          <a href="https://leafblower-studio.itch.io/aeio" className="text-sky-400" target="_blank" rel="noreferrer">
            <BsLink45Deg className="inline-block w-6 h-6" aria-label="link to aeio" />
          </a>
        </span>
        <Carousel className="w-full max-w-[1920px] px-4 md:px-6" urls={urls2} />
        <span className="px-4 md:px-6">
          A game project made at the Games Academy in a team of 4. My responsibilities:<br />Multiplayer<br />Some UI<br />Technical art<br />character animation/control
        </span>
      </div>
      <BsArrowDown
        className="w-8 h-8 animate-bounce shrink-0"
      />
    </div>
  </>
);

export default Projects;