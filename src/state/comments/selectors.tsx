import { AppState } from "../state";

export const getComments = (state: AppState) => state.comments;
export const getCommentsOfPost = (state: AppState, postId: number) => getComments(state).filter(comment => comment.postId === postId); 