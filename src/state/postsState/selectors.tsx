import { AppState } from "../state";

export const getPostsLoadStatus = (state: AppState) => state.postsState.listStatus;

export const getCommentsLoadStatus = (state: AppState, postId: number) => {
  const postState = state.postsState.postState.find(post => post.postId === postId);
  return postState ? postState.commentStatus : undefined;
}