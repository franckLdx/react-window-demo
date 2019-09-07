import { CommentState, initialCommentState } from "./state";
import { AppActions } from "../actions";

export const comments = (state: CommentState = initialCommentState, action: AppActions): CommentState => {
  switch (action.type) {
    case 'LOADING_COMMENTS_SUCCESSFULL':
      return { ...state, comments: action.comments, loadStatus: 'loaded' }
    default:
      return state;
  }
}