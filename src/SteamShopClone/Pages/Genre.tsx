import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAppsInGenre, GenreApps, Genre } from 'SteamShopClone/steam';
import {
  AiFillWindows,
  AiFillApple,
} from 'react-icons/ai';

const GenrePage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [genreApps, setGenreApps] = React.useState<GenreApps | null>(null);

  useEffect(() => {
    getAppsInGenre(genre as Genre).then((results) => {
      setGenreApps(results);
    }).catch(() => {
      navigate('/404')
    });
  }, [genre]);



  return (
    <div className="w-full bg-steam-back">
      <div className="w-full max-w-5xl mx-auto flex flex-col z-10 min-h-screen">
      </div>
    </div>
  );
}

export default GenrePage;