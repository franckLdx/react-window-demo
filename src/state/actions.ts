import { PostsActions } from "./posts/actions";
import { CommentsActions } from "./comments/actions";
import { loadPosts, loadCommentsOfPost } from '../services';
import { Post } from "../types";

export * from "./posts/actions";
export * from "./comments/actions";

export type AppActions = PostsActions | CommentsActions;

export interface ThunkExtraArgs {
  loadPosts: () => Promise<Post[]>
  loadCommentsOfPost: (postId: number) => Promise<Comment[]>
}

export const thunkExtraArg: ThunkExtraArgs = {
  loadPosts, loadCommentsOfPost
};
