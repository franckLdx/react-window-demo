import { PostState } from "./posts/state";
import { CommentState } from "./comments/state";

export type AppState = {
  posts: PostState;
  comments: CommentState;
}