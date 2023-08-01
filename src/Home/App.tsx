import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Intro from './Intro';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Outro from './Outro';
import {
  ScrollRestoration,
} from "react-router-dom";
import Apps from './Apps';

const App = () => {
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

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollPosition = (e.currentTarget as HTMLElement).scrollTop;
    if (scrollPosition < screenHeight) {
      setActiveSection('intro');
    } else if (scrollPosition < screenHeight * 2) {
      setActiveSection('about');
    } else if (scrollPosition < screenHeight * 3) {
      setActiveSection('skills');
    } else if (scrollPosition < screenHeight * 4) {
      setActiveSection('project1');
    } else if (scrollPosition < screenHeight * 5) {
      setActiveSection('project2');
    } else if (scrollPosition < screenHeight * 6) {
      setActiveSection('apps');
    } else {
      setActiveSection('outro');
    }
  }, [screenHeight]);

  useEffect(() => {
    window.location.hash = activeSection;
  }, [activeSection]);
  
  return (
    <div className="bg-zinc-800 text-zinc-200 overflow-x-hidden overflow-y-auto hidden-scrollbar font-ubuntu-mono snap-mandatory snap-y snap-always" style={{ height: screenHeight }} onScroll={onScroll}>
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

export default App;