import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="w-full bg-steam-back relative">
      <div className="w-full max-w-5xl mx-auto flex flex-col z-10 relative top-0">

      </div>
    </div>
  )
};

export default Search;