import { LoadStatus } from "./utils";
import { Post, PostComment } from "../types";

export const initialPostsState: PostsState = {
  loadStatus: 'initial',
  posts: [],
}

export interface PostsState {
  loadStatus: LoadStatus;
  posts: PostState[];
}

export interface PostState {
  loadStatus: LoadStatus;
  post: Post;
  comments: PostComment[];
}

export function initialPostState(post: Post): PostState {
  return {
    post,
    loadStatus: 'initial',
    comments: []
  };
}