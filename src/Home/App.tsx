import React, { useEffect, useState } from 'react';
import {
  BsArrowDown,
} from 'react-icons/bs';
import Intro from './Intro';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';

const App = () => {
 
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Resize event listener
  useEffect(() => {
    const resizeListener = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);
  
  return (
    <div className="bg-zinc-800 text-zinc-200 overflow-x-hidden overflow-y-auto hidden-scrollbar font-ubuntu-mono snap-mandatory snap-y snap-always" style={{ height: screenHeight }}>
      <Intro height={screenHeight} />
      <About height={screenHeight} />
      <Skills height={screenHeight} />
      <Projects height={screenHeight} />
    </div>
  )
};

export default App;