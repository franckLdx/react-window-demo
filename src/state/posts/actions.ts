import { ActionCreator } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../state";
import { AppActions, ThunkExtraArgs } from "../actions";
import { Post } from "../../types";
import { loadCommentsOfPost } from "../../services";
import { loadingCommentsSuccessfull } from "../comments/actions";
import { getPostLoadStatus } from "./selectors";

type AppThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgs, AppActions>;

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

export const loadPost = (postId: number) => {
  return async (dispatch: AppThunkDispatch) => {
    dispatch(loadPosts());
    const response = await loadCommentsOfPost(postId);
    dispatch(loadingCommentsSuccessfull(response));
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
