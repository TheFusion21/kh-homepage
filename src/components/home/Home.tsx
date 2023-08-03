import React, { useCallback, useEffect, useState } from 'react';
import Intro from './Intro';
import About from './About';
import Skills from './Skills';
import Outro from './Outro';
import Projects from './Projects';
import Apps from './Apps';
import {
  ScrollRestoration,
} from "react-router-dom";

const Home: React.FC = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [activeSection, setActiveSection] = useState('intro');

  // Resize event listener
  useEffect(() => {
    const resizeListener = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return (
    <div
      className="bg-zinc-800 text-zinc-200 overflow-x-hidden overflow-y-auto hidden-scrollbar font-ubuntu-mono snap-mandatory snap-y snap-always"
      style={{ height: screenHeight }}
    >
      <Intro height={screenHeight} />
      <About height={screenHeight} />
      <Skills height={screenHeight} />
      <Projects height={screenHeight} />
      <Apps height={screenHeight} />
      <Outro height={screenHeight} />
      <ScrollRestoration />
    </div>
  )
};

export default Home;