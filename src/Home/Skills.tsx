import React from 'react';
import {
  BsArrowDown,
} from 'react-icons/bs';

const Skills = ({ height } : {height: number}) => (
  <div className="w-screen flex items-center justify-center flex-col px-4 sm:px-8 md:px-12 lg:px-16 snap-start" style={{ height }} id="skills">
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
      className="w-8 h-8 animate-bounce shrink-0"
    />
  </div>
);

export default Skills;