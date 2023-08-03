import React from 'react';
import { Link } from 'react-router-dom';

interface OutroProps {
  height: number;
}

const Outro: React.FC<OutroProps> = ({ height }) => (
  <div className="w-screen flex items-center justify-center flex-col px-4 sm:px-8 md:px-12 lg:px-16 snap-start" style={{ height }} id="outro">
    <div className="shrink-0 grow flex flex-col items-center justify-center text-lg uppercase">
      <span>
        Source available at&nbsp;
        <a
          href="https://github.com/TheFusion21/kh-homepage"
          target="_blank"
          rel="noreferrer"
          className="text-sky-400"
        >
          Github
        </a>
      </span>
      <span>
        Copyright © 2023 Kay Hennig 
      </span>
      <Link to="/Imprint" className="text-sky-400">
        Imprint
      </Link>
    </div>
  </div>
);

export default Outro;