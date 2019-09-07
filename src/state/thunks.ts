import { Post } from "../types";
import { loadPosts, loadCommentsOfPost } from "../services"

export interface ThunkExtraArgs {
  loadPosts: () => Promise<Post[]>;
  loadCommentsOfPost: (postId: number) => Promise<Comment[]>;
}

export const thunkExtraArg: ThunkExtraArgs = {
  loadPosts, loadCommentsOfPost
};
