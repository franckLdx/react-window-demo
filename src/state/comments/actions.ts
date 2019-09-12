import { ActionCreator } from "redux";
import { PostComment } from "../../types";
import { AppState } from "../state";
import { AppThunkDispatch, loadPosts } from "../actions";
import { ThunkExtraArgs } from "../thunks";
import { getCommentsOfPostLoadStatus } from "../postsState/selectors";

export const loadCommentsOfPost = (postId: number) => {
  return async (dispatch: AppThunkDispatch, getState: () => AppState, { services }: ThunkExtraArgs) => {
    dispatch(loadPosts());
    if (getCommentsOfPostLoadStatus(getState(), postId) === 'loaded') {
      return;
    }
    const response = await services.loadCommentsOfPost(postId);
    dispatch(loadingCommentsSuccessfull(postId, response));
  }
}

export interface LoadingCommentsSuccessfull {
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  postId: number,
  comments: PostComment[]
}
export const loadingCommentsSuccessfull: ActionCreator<LoadingCommentsSuccessfull> = (postId: number, comments: PostComment[]) => ({
  type: 'LOADING_COMMENTS_SUCCESSFULL',
  postId,
  comments,
});

export type CommentsActions = LoadingCommentsSuccessfull;
