import { PostsActions } from "./posts/actions";
import { loadPosts } from '../service';

export type AppActions = PostsActions;

export interface ThunkExtraArgs {
  loadPosts: () => Promise<any>
}

export const thunkExtraArg: ThunkExtraArgs = {
  loadPosts
};
