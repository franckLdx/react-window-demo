import { PostComment } from "../../types";
import { LoadStatus } from "../utils";

export interface CommentState {
  loadStatus: LoadStatus,
  comments: PostComment[],
}

export const initialCommentState: CommentState = {
  loadStatus: 'initial',
  comments: []
}
