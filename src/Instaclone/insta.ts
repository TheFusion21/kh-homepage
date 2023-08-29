export interface PostImage {
  id: number;
  url: string;
}
export interface PostUser {
  id: number;
  username: string;
  profileImage: string;
  link: string;
  verified: boolean;
}
export interface Post {
  id: number;
  images: PostImage[];
  description: string | null;
  user: PostUser;
  commentCount: number;
  likes: number;
}

export interface User {
  id: number;
  username: string;
  smallImage: string;
  mediumImage: string;
  link: string;
  posts: number;
  followers: number;
  following: number;
  verified: boolean;
}

export interface UserPost {
  count: number;
  posts: Post[];
}

export interface Comment {
  user: User;
  comment: string;
}
export interface FullPost {
  id: number;
  images: PostImage[];
  description: string | null;
  user: PostUser;
  comments: Comment[];
  likes: number;
}

export const getPosts = async (start: number, end: number): Promise<Post[]> => 
  fetch(`/api/instaclone/posts?start=${start}&end=${end}`).then(res => res.json());

export const getUser = async (username: string): Promise<User> =>
  fetch(`/api/instaclone/${username}`).then(res => res.json());

export const getUserPosts = async (username: string, start: number, end: number): Promise<UserPost> =>
  fetch(`/api/instaclone/posts/${username}?start=${start}&end=${end}`).then(res => res.json());

export const getPost = async (id: number | string): Promise<FullPost> =>
  fetch(`/api/instaclone/post/${id}`).then(res => res.json());