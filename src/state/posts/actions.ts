import { ActionCreator } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../state";
import { AppActions, ThunkExtraArgs } from "../action";
import { Post } from "../../types";

type AppThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgs, AppActions>;

export const loadPosts = () => {
  return async (dispatch: AppThunkDispatch, _state: AppState, { loadPosts }: ThunkExtraArgs) => {
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

export type LoadStatus = 'initial' | 'loading' | 'loaded' | 'failed';
