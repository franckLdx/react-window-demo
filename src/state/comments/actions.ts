import { ActionCreator } from "redux";
import { PostComment } from "../../types";
import { AppState } from "../state";
import { ThunkExtraArgs, AppThunkDispatch, loadPosts } from "../actions";

export const loadCommentsOfPost = (postId: number) => {
  return async (dispatch: AppThunkDispatch, getState: () => AppState, { loadCommentsOfPost }: ThunkExtraArgs) => {
    dispatch(loadPosts());
    const response = await loadCommentsOfPost(postId);
    dispatch(loadingCommentsSuccessfull(response));
  }
}

export interface LoadingCommentsSuccessfull {
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  comments: PostComment[]
}
export const loadingCommentsSuccessfull: ActionCreator<LoadingCommentsSuccessfull> = (comments: PostComment[]) => ({
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  comments,
});

export type CommentsActions = LoadingCommentsSuccessfull;
