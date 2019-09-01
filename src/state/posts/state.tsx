import { Post } from "../../types";

export type LoadState = 'initial' | 'loading' | 'loaded' | 'error';

export interface PostState {
  loadStatus: LoadState,
  posts: Post[],
}

export const initialPostState: PostState = {
  loadStatus: 'loaded',
  posts: []
}
