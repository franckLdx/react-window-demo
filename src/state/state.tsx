import { Posts } from "./posts/state";
import { Comments } from "./comments/state";
import { PostsState } from "./postsState/state";

export type AppState = {
  posts: Posts;
  comments: Comments;
  postsState: PostsState
}