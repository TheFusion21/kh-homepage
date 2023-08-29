import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
      <nav className="fixed bg-zinc-950 z-50 h-12 flex items-center w-full px-4">
        <Link className="font-bold font-mono uppercase text-xl" to="/">
          instaclone
        </Link>
      </nav>
    )
};

export default Header;