import React from 'react';
import {
  BsArrowDown,
  BsLink45Deg,
} from 'react-icons/bs';

interface ProjectsProps {
  height: number;
}

const Projects: React.FC<ProjectsProps> = ({ height }) => (
  <>
    <div className="w-full flex items-center justify-center flex-col snap-start" style={{ height }} id="project1">
      <div className="shrink-0 grow flex flex-col items-center justify-center w-full h-full">
        <span className="uppercase text-xl sm:text-3xl mb-3">
          Projects
        </span>
        <span className="uppercase text-lg sm:text-xl text-center">
          Over the Edge
          <a href="https://brunchtime-studio.itch.io/over-the-edge" className="text-sky-400" target="_blank" rel="noreferrer">
            <BsLink45Deg className="inline-block w-6 h-6" aria-label="link to over the edge" />
          </a>
        </span>
        <div className="md:basis-2/3 grid grid-cols-2 sm:grid-cols-4 gap-2 shrink px-2">
          <img src="https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4MzgucG5n/original/h7HSEe.png" alt="over the edge" className="h-full w-full object-contain max-h-[80vh]" />
          <img src="https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4NDYucG5n/original/DXQaKI.png" alt="over the edge" className="h-full w-full object-contain max-h-[80vh]" />
          <span className="col-span-full sm:col-span-2">
          A game project made at the Games Academy in a team of 4.<br />My responsibilities:<br />Multiplayer<br />Some UI<br />Technical art<br />character animation/control
          </span>
        </div>
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
        <div className="md:basis-1/4 grid grid-cols-1 sm:grid-cols-2 gap-2 shrink px-2">
          <img src="https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMDguanBn/original/LGj31C.jpg" alt='aeio' className="h-full w-full object-contain max-h-[25vh] sm:max-h-[65vh]" />
          <img src="https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMDguanBn/original/LGj31C.jpg" alt='aeio' className="h-full w-full object-contain max-h-[25vh] sm:max-h-[65vh]" />
          <span className="sm:col-span-full">
            A game project made at the Games Academy in a team of 4. My responsibilities:<br />Multiplayer<br />Some UI<br />Technical art<br />character animation/control
          </span>
        </div>
      </div>
      <BsArrowDown
        className="w-8 h-8 animate-bounce shrink-0"
      />
    </div>
  </>
);

export default Projects;