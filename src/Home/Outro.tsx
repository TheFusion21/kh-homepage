import React from 'react';
import { Link } from 'react-router-dom';
const Outro = () => (
  <span className="uppercase text-sm text-center text-green-600">
    Source available at&nbsp;
    <a
      href="https://github.com/TheFusion21/kh-homepage"
      target="_blank"
      rel="noreferrer"
      className="text-sky-400"
    >
      Github
    </a>
    <br />
    Copyright © 2023 Kay Hennig
    <br />
    <Link to="/Imprint" className="text-sky-400">
      Imprint
    </Link>
  </span>
);

export default Outro;