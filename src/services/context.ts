import { createContext } from 'react';
import { Post, PostComment } from '../types';

export interface Services {
  loadPosts: () => Promise<Post[]>,
  loadCommentsOfPost: (postId: number) => Promise<PostComment[]>,
  addComments: (postId: number, title: string, comment: string, email: string) => Promise<void>
};

export const ApiContext = createContext<Services | undefined>(undefined);