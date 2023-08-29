import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FullPost as Post, getPost } from './insta';
import {
  MdVerified
} from 'react-icons/md';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMessage,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import isMobile from 'utils/isMobile';

const FullPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    getPost(postId).then(post => {
      setPost(post);
    });
  }, [postId]);

  useEffect(() => {
    const onScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const imageWidth = scrollRef.current.children[0].clientWidth;
        const imageIndex = Math.round(scrollLeft / imageWidth);
        setActiveImage(imageIndex);
        console.log(imageIndex);
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', onScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', onScroll);
      }
    };
  }, [scrollRef, post]);

  const likes = useMemo(() => post?.likes + (liked ? 1 : 0), [post, liked]);

  const nextImage = useCallback(() => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const imageWidth = scrollRef.current.children[0].clientWidth;
      const imageIndex = Math.round(scrollLeft / imageWidth);
      const nextImageIndex = imageIndex + 1;
      scrollRef.current.scrollTo({
        left: nextImageIndex * imageWidth,
        behavior: 'smooth',
      });
      setActiveImage(nextImageIndex);
    }
  }, [scrollRef]);

  const prevImage = useCallback(() => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const imageWidth = scrollRef.current.children[0].clientWidth;
      const imageIndex = Math.round(scrollLeft / imageWidth);
      const prevImageIndex = imageIndex - 1;
      scrollRef.current.scrollTo({
        left: prevImageIndex * imageWidth,
        behavior: 'smooth',
      });
      setActiveImage(prevImageIndex);
    }
  }, [scrollRef]);
  
  if (post === null) {
    return null;
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="px-2">
        <Link to={post.user.link} className="flex flex-row items-center gap-2 h-12">
          <img src={post.user.profileImage} alt="" className="h-8 w-8 rounded-full" />
          <div className="text-sm font-semibold">
            <span>{post.user.username}</span>
          </div>
          {post.user.verified && (
            <MdVerified className="text-blue-500 h-3 w-3" />
          )}
        </Link>
      </div>
      <div className="relative" onDoubleClick={() => setLiked(true)}>
        <div className="overflow-scroll no-scrollbar flex flex-row flex-nowrap snap-x snap-mandatory" ref={scrollRef}>
          {post.images.map(image => (
            <img key={image.id} src={image.url} alt="" className="w-full snap-center snap-always" />
          ))}
        </div>
        {post.images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-center items-center p-1 gap-1">
            {post.images.map((image, index) => (
              <div className={`rounded-full w-[6px] h-[6px] ${index === activeImage ? 'bg-white/50' : 'bg-white/20'}`} key={image.id} />
            ))}
          </div>
        )}
        {!isMobile() && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center p-2">
            <button className="rounded-full bg-zinc-100">
              <AiOutlineLeft className="text-zinc-950 w-6 h-6 p-1" onClick={prevImage} />
            </button>
            <button className="rounded-full bg-zinc-100">
              <AiOutlineRight className="text-zinc-950 w-6 h-6 p-1" onClick={nextImage} />
            </button>
          </div> 
        )}
      </div>
      <div className="flex flex-row h-10 px-2 items-center">
        <button onClick={() => setLiked((liked) => !liked)} className="h-6 w-6">
          {liked[post.id] ? (
            <AiFillHeart className="text-red-500 h-6 w-6" />
          ) : (
            <AiOutlineHeart className="text-zinc-100 h-6 w-6" />
          )}
        </button>
        <Link to={`/post/${post.id}`} className="mx-2">
          <AiOutlineMessage className="text-zinc-100 h-6 w-6" />
        </Link>
      </div>
      {likes > 0 && (
        <span className="text-sm px-2 mb-1 font-semibold">
          {Intl.NumberFormat().format(likes)} likes
        </span>
      )}
      {post.description && (
        <div className="text-sm px-2 mb-1">
          <span className="font-semibold">
            {post.user.username}
          </span>
          <span className="ml-1">
            {post.description}
          </span>
        </div>
      )}
      {post.comments.length > 0 && (
        <div>
          {post.comments.map(comment => (
            <div className="flex flex-row py-2">
              <Link className="px-4" to={comment.user.link}>
                <img src={comment.user.smallImage} alt="" className="h-8 w-8 rounded-full" />
              </Link>
              <div className="text-sm">
                <Link className="font-semibold" to={comment.user.link}>
                  {comment.user.username}
                </Link>
                &nbsp;
                <span>{comment.comment}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default FullPost;