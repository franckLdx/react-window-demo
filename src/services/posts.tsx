import { Post } from "../types";

export const loadPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return (await response.json()) as Post[];
};

export const loadCommentsOfPost = async (postId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  return (await response.json()) as any[];
};