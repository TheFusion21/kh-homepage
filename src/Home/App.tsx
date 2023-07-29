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
    const speed = 100;
    const typeAnimation = (i: number, title: string) => {
      if (i === 0) setText(''); // Clear text
      const remove = () => {
        if (i >= 0) {
          setText(title.slice(0, i));
          i--;
          setTimeout(remove, speed);
        } else {
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
    <div className="bg-zinc-800 text-zinc-200 overflow-x-hidden overflow-y-auto hidden-scrollbar font-mono snap-mandatory snap-y snap-always" style={{ height: screenHeight }}>
      {/* Intro */}
      <div className="w-screen flex items-center justify-center flex-col snap-start" style={{ height: screenHeight }}>
        <div className="shrink-0 grow flex items-center justify-center">
          <span className="uppercase text-base sm:text-2xl ">
            &gt;I am Kay a&nbsp;
          </span>
          <span className="typewriter text-orange-400 uppercase text-base sm:text-2xl font-bold">
            {text}
          </span>
        </div>
        <BsArrowDown
          className="w-8 h-8 animate-bounce"
        />
      </div>
      {/* About */}
      <div className="w-screen flex items-center justify-center flex-col px-4 sm:px-8 md:px-12 lg:px-16 snap-start" style={{ height: screenHeight }}>
        <div className="shrink-0 grow flex flex-col items-center justify-center text-xs md:text-base">
          <span className="uppercase text-xl sm:text-3xl mb-3">
            About
          </span>
          <span>
            Hi, I am Kay. I am a fullstack developer with a passion for games, game development and machine learning.
          </span>
          <span>
            My first programming language was C# and while I still love it, I have been working with Javascript and Typescript for the past year.
          </span>
          <span>
            I've started learning programming at the age of 11 or 12 as curiosity got the better of me.
          </span>
          <span>
            Ever since then I've been learning new things and trying to improve my skills. I've been working on a few projects, some of which you can find on my github.
          </span>
          <span>
            Most of which not finished, as fellow developers will know, it's hard to finish a project. ^^
          </span>
          <span>
            Over the past years I've been learning and working on a lot of different things, from web development to game development and machine learning.
          </span>
          <span>
            Throughout my journey I've picked up a lot of skills and knowledge, some of which I will list below.
          </span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 text-sm sm:text-base">
            <span className="font-bold">
              Languages:
            </span>
            <span>
              C#, C++, Javascript, Typescript, Python, HTML, CSS, SQL, Hlsl, glsl, cuda
            </span>
            <span className="font-bold">
              Tools/Frameworks:
            </span>
            <span>
              React, Node, Express, Unity, Pytorch, Tailwind, Webpack, Git, Barbel, Blender, Unreal Engine, OpenXR, Cuda
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
        <div className="shrink-0 grow flex flex-col items-center justify-center">
          <span className="uppercase text-xl sm:text-3xl mb-3">
            Projects
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div>
              <span>
                
              </span>
            </div>
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