import { AppState } from "../state";
import { createSelector } from "reselect";
import { PostState } from "./state";

export const getPostsLoadStatus = (state: AppState) => state.postsState.listStatus;

const postState = (state: AppState) => state.postsState.postState

export const makeGetCommentsOfPostLoadStatus = (postId: number) => createSelector([postState],
  (postStates: PostState[]) => {
    const postState = postStates.find(post => post.id === postId);
    return postState ? postState.commentStatus : undefined;
  }
);
