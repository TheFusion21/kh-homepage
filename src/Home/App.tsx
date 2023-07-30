import React, { useEffect, useState } from 'react';
import {
  BsArrowDown,
} from 'react-icons/bs';

const introTitles = [
  'Unity Developer',
  'React Developer',
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Javascript Developer',
  'Typescript Developer',
  'C++ Developer',
  'Game Engine Developer',
  'C# Developer',
  'Python Developer',
  'ML Developer',
  'Game Developer',
  'Gamer',
  'Human',
];
const App = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Resize event listener
  useEffect(() => {
    const resizeListener = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const speed = 110;
    const typeAnimation = (i: number, title: string) => {
      setTitle(title);
      if (i === 0) setText(''); // Clear text
      const remove = () => {
        if (i >= 0) {
          setText(title.slice(0, i));
          i--;
          setTimeout(remove, speed);
        } else {
          setTitle('');
          setTimeout(() => typeAnimation(0, introTitles[Math.floor(Math.random() * introTitles.length)]), 1000);
        }
      };
      const type = () => {
        const titleLength = title.length;
        if (i < titleLength) {
          setText(title.slice(0, i + 1));
          i++;
          setTimeout(type, speed);
        } else {
          setTimeout(remove, 1500);
        }
      };
      setTimeout(type, speed);
    };
    const timeout = setTimeout(() => typeAnimation(0, introTitles[Math.floor(Math.random() * introTitles.length)]), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const scrollDown = () => {
    console.log(Math.floor((window.innerHeight*2 + window.scrollY) / window.innerHeight) * window.innerHeight)
    window.scrollTo({
      top: window.innerHeight + window.scrollY,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-zinc-800 text-zinc-200 overflow-x-hidden overflow-y-auto hidden-scrollbar font-ubuntu-mono snap-mandatory snap-y snap-always" style={{ height: screenHeight }}>
      {/* Intro */}
      <div className="w-screen flex items-center justify-center flex-col snap-start" style={{ height: screenHeight }}>
        <div className="shrink-0 grow flex items-center justify-center">
          <span className="uppercase text-base sm:text-2xl xl:text-3xl">
            &gt;I am Kay a&nbsp;
          </span>
          <span
            className="typewriter text-orange-400 uppercase text-base sm:text-2xl xl:text-3xl"
            aria-label={title}
           >
            {text}
          </span>
        </div>
        <BsArrowDown
          className="w-8 h-8 animate-bounce"
        />
      </div>
      {/* About */}
      <div className="w-screen flex items-center justify-center flex-col px-4 sm:px-8 md:px-12 lg:px-16 snap-start" style={{ height: screenHeight }}>
        <div className="shrink-0 grow flex flex-col items-center justify-center text-sm md:text-base lg:text-xl text-center">
          <span className="uppercase text-xl sm:text-3xl mb-3">About</span>
          <div>
            <span>
              I am a fullstack developer with a passion for games, game development and machine learning.
              My first programming language was C# and while I still love it,
              I have been working with Javascript and Typescript for the past year.
              I've started learning programming at the age of 11 or 12 as curiosity got the better of me.
              Ever since then I've been learning new things and trying to improve my skills.
              I've been working on a few projects, some of which you can find on my github.
              Most of which not finished, as fellow developers will know, it's hard to finish a project. ^^
              Over the past years I've been learning and working on a lot of different things,
              from web development to game development and machine learning.
              Throughout my journey I've picked up a lot of skills and knowledge, some of which I will list below.
            </span>
          </div>
        </div>
        <BsArrowDown
          className="w-8 h-8 animate-bounce"
        />
      </div>
      {/* Skills */}
      <div className="w-screen flex items-center justify-center flex-col px-4 sm:px-8 md:px-12 lg:px-16 snap-start" style={{ height: screenHeight }}>
        <div className="shrink-0 grow flex flex-col items-center justify-center">
          <span className="uppercase text-xl sm:text-3xl mb-3">
            Skills
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 text-sm md:text-base lg:text-xl">
            <span className="font-bold">
              Languages:
            </span>
            <span>
              C#, C++, JavaScript, TypeScript, Python, HTML, CSS, SQL, HLSL, GLSL, CUDA
            </span>
            <span className="font-bold">
              Tools/Frameworks:
            </span>
            <span>
              React, Node, Express, Unity, Pytorch, Tailwind, Webpack, Git, Barbel, Blender, Unreal Engine, OpenXR, CUDA
            </span>
            <span className="font-bold">
              Other:
            </span>
            <span>
              KiCad, Assembly, Brainfuck
            </span>
          </div>
        </div>
        <BsArrowDown
          className="w-8 h-8 animate-bounce"
        />
      </div>
      {/* Projects */}
      <div className="w-screen flex items-center justify-center flex-col snap-start" style={{ height: screenHeight }}>
        <div className="shrink-0 grow flex flex-col items-center justify-center w-full">
          <span className="uppercase text-xl sm:text-3xl mb-3">
            Projects
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-2 px-2 md:gap-6 md:px-6">
            <span className="uppercase text-lg sm:text-xl text-center col-span-full">
              Over the Edge
            </span>
            <img src="https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4MzgucG5n/original/h7HSEe.png" alt="Ingame screenshot" className="w-full mx-auto" />
            <img src="https://img.itch.zone/aW1hZ2UvNzc4ODQ5LzQzNTY4NDYucG5n/original/DXQaKI.png" alt="Ingame screenshot" className="w-full mx-auto" />
            <div className="flex flex-col col-span-full md:col-span-1">
              <span>
                A game project made at the Games Academy in a team of 4. My responsibilities:<br/>Multiplayer<br/>Some UI<br/>Technical art<br/>character animation/control
              </span>
            </div>
          </div>
        </div>
        <BsArrowDown
          className="w-8 h-8 animate-bounce"
        />
      </div>
      <div className="w-screen flex items-center justify-center flex-col snap-start" style={{ height: screenHeight }}>
        <div className="shrink-0 grow flex flex-col items-center justify-center w-full">
          <span className="uppercase text-xl sm:text-3xl mb-3">
            Projects
          </span>
          <div className="grid grid-cols-2 w-full gap-2 px-2 md:gap-6 md:px-6">
            <span className="uppercase text-lg sm:text-xl text-center col-span-full">
              AEIO
            </span>
            <img src="https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMDguanBn/original/LGj31C.jpg" alt="Ingame screenshot" className="col-span-full md:col-span-1 w-full mx-auto" />
            <div className="flex flex-col col-span-full md:col-span-1">
              <span>
                A game project made at the Games Academy in a team of 4. My responsibilities:<br/>Multiplayer<br/>Some UI<br/>Technical art<br/>character animation/control
              </span>
            </div>
            <img src="https://img.itch.zone/aW1hZ2UvOTEzNDMyLzUxODQzMTAuanBn/original/vTly2W.jpg" alt="Ingame screenshot" className="row-start-3 md:row-start-auto col-span-full md:col-span-1 w-full mx-auto" />
          </div>
        </div>
        <BsArrowDown
          className="w-8 h-8 animate-bounce"
        />
      </div>
    </div>
  )
};

export default App;