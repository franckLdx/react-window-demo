import { ActionCreator } from "redux";
import { AppState } from "../state";
import { AppThunkDispatch } from "../actions";
import { Post } from "../../types";
import { getPostLoadStatus } from "./selectors";
import { ThunkExtraArgs } from "../thunks";

export const loadPosts = () => {
  return async (dispatch: AppThunkDispatch, getState: () => AppState, { loadPosts }: ThunkExtraArgs) => {
    const state = getState();
    if (getPostLoadStatus(state) === 'loaded') {
      return;
    }
    dispatch(LoadingPosts());
    try {
      const response = await loadPosts();
      dispatch(loadingPostSuccessfull(response));
    } catch (error) {
      console.error(error);
      dispatch(loadingPostsError());
    }
  }
}

export interface LoadingPosts {
  type: 'LOADING_POSTS'
}
export const LoadingPosts = (): LoadingPosts => ({
  type: 'LOADING_POSTS'
});

export interface LoadingPostsSuccess {
  type: 'LOADING_POST_SUCCESSFULL',
  posts: Post[]
}
export const loadingPostSuccessfull: ActionCreator<LoadingPostsSuccess> = (posts: Post[]) => ({
  type: 'LOADING_POST_SUCCESSFULL',
  posts,
});

export interface LoadingPostsError {
  type: 'LOADING_POSTS_ERROR'
}
export const loadingPostsError: ActionCreator<LoadingPostsError> = () => ({
  type: 'LOADING_POSTS_ERROR'
});

export type PostsActions = LoadingPostsSuccess | LoadingPosts | LoadingPostsError;
