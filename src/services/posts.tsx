import { Post } from "../types";

export const loadPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return (await response.json()) as Post[];
};