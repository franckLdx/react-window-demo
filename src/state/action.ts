import { PostsActions } from "./posts/actions";
import { loadPosts } from '../service';
import { Post } from "../types";

export type AppActions = PostsActions;

export interface ThunkExtraArgs {
  loadPosts: () => Promise<Post[]>
}

export const thunkExtraArg: ThunkExtraArgs = {
  loadPosts
};
