import { Post } from "../../types";

export type LoadStatus = 'initial' | 'loading' | 'loaded' | 'error';

export interface PostState {
  loadStatus: LoadStatus,
  posts: Post[],
}

export const initialPostState: PostState = {
  loadStatus: 'loaded',
  posts: []
}
