import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post, User, getUser, getUserPosts } from './insta';
import {
  TfiGallery,
} from 'react-icons/tfi';
import {
  MdVerified
} from 'react-icons/md';

const FullUser = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState<User | null>(null);
  const [noUser, setNoUser] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [start, setStart] = useState(0);
  const postCount = 50;

  useEffect(() => {
    getUser(userId).then((setUser)).catch(() => setNoUser(true));
  }, [userId, postCount]);

  useEffect(() => {
    if (user === null || posts.length >= user.posts) return;
    getUserPosts(user.username, start, Math.min(user.posts, start + postCount)).then(newPosts => {
      setPosts(posts => [...posts, ...newPosts.posts]);
    });
  }, [start, postCount, user]);


  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setStart(start => start + postCount);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="mx-auto max-w-lg">
      {user && (
        <>
          <div className="flex flex-row px-2 items-center gap-2 my-4 break-all hyphens-auto">
            <img src={user.mediumImage} className="rounded-full w-20 h-20 shrink-0" />
            <span className="text-lg font-semibold shrink">
              {user.username}
            </span>
            {user.verified && (
              <MdVerified className="text-blue-500 h-5 w-5 shrink-0" /> 
            )}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <Link className="relative" key={post.id} to={`/post/${post.id}`}>
                <img src={post.images[0].url} className="w-full h-full object-cover z-0" />
                <div className="absolute right-0 top-0 w-6 h-6 z-10">
                  {post.images.length > 1 && (
                    <TfiGallery className="w-6 h-6 p-1 stroke-1 drop-shadow-md" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      {noUser && (
        <div className="px-2 text-center text-xl uppercase my-16">
          <span>
            User not found
          </span>
        </div> 
      )}
    </div>
  )
};

export default FullUser;