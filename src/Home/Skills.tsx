import React from 'react';

const Skills = () => (
  <>
    <span>
      <h1 className="uppercase text-xl sm:text-2xl md:text-3xl mb-3 text-green-600 text-center" id="skills">
        // Skills
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 lg:gap-y-4 text-sm md:text-base lg:text-xl w-full">
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
    </span>
    <span>
      <h1 className="uppercase text-xl sm:text-2xl md:text-3xl mb-3 text-green-600 text-center" id="experiences">
        // experiences
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 text-sm md:text-base lg:text-xl w-full">
        <span className="font-bold">
          Caseking GmbH
        </span>
        <span>
          Full Stack Developer / Administrator(1 yr)
        </span>
        <span className="font-bold">
          Games Academy
        </span>
        <span>
          Game Programmer - Apprenticeship(2 yrs)
        </span>
      </div>
    </span>
  </>
);

export default Skills;