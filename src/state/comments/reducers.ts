import { initialComments, Comments } from "./state";
import { AppActions } from "../actions";
import { PostComment } from "../../types";

export const comments = (state: Comments = initialComments, action: AppActions): Comments => {
  switch (action.type) {
    case 'LOADING_COMMENTS':
      return removeCommentsOfPost(state, action.postId);
    case 'LOADING_COMMENTS_SUCCESSFULL':
      return [...action.comments, ...removeCommentsOfPost(state, action.postId)];
    default:
      return state;
  }
}

const removeCommentsOfPost = (state: PostComment[], postId: number) =>
  state.filter(comment => postId !== comment.postId);