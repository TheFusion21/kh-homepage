import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-800 flex-col">
        <div className="text-4xl font-bold text-zinc-200 uppercase">Nothing Here</div>
        <Link to="/" className="text-2xl font-bold text-sky-400 uppercase">Go back Home</Link>
    </div>
);

export default NotFound;