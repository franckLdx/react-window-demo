import { AppState } from "../state";

export const getPostsLoadStatus = (state: AppState) => state.postsState.listStatus;

export const getCommentsOfPostLoadStatus = (state: AppState, postId: number) => {
  const postState = state.postsState.postState.find(post => post.id === postId);
  return postState ? postState.commentStatus : undefined;
}