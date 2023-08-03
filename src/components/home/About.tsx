import React from 'react';
import {
  BsArrowDown,
} from 'react-icons/bs';

interface AboutProps {
  height: number;
}

const About: React.FC<AboutProps> = ({ height }) => (
  <div className="w-screen flex items-center justify-center flex-col px-4 sm:px-8 md:px-12 lg:px-16 snap-start" style={{ height }} id="about">
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
      className="w-8 h-8 animate-bounce shrink-0"
    />
  </div>
);

export default About;