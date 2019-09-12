import { Post, PostComment } from "../types";
import { Services } from "./context";

export const services: Services = {
  loadPosts: async () => handleErrors<Post[]>(fetch('https://jsonplaceholder.typicode.com/posts')),

  loadCommentsOfPost: async (postId: number) => handleErrors<PostComment[]>(fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)),

  addComments: async (postId: number, title: string, comment: string, email: string) => {
    await handleErrors(
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
        method: 'POST',
        body: JSON.stringify({
          postId,
          name: title,
          body: comment,
          email
        })
      }))
  }
}

const handleErrors = async <T,>(fetchResult: Promise<Response>) => {
  const response = await fetchResult;
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json() as T;
}
