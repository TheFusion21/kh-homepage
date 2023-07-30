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

const Intro = ({ height } : {height: number}) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
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

  return (
    <div className="w-screen flex items-center justify-center flex-col snap-start" style={{ height }}>
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
        className="w-8 h-8 animate-bounce shrink-0"
      />
    </div>
  )
};

export default Intro;