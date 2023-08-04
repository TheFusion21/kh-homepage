import React from 'react';
import Intro from './Intro';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Apps from './Apps';
import Outro from './Outro';
import {
  ScrollRestoration,
} from "react-router-dom";

const App = () => (
  <div className="bg-zinc-800 text-zinc-200 font-ubuntu-mono">
    <div className="max-w-5xl mx-2 sm:mx-6 md:mx-10 lg:mx-auto flex flex-col gap-20 justify-center">
      <Intro />
      <About />
      <Skills />
      <Projects />
      <Apps />
      <Outro />
      <ScrollRestoration />
    </div>
  </div>
);

export default App;