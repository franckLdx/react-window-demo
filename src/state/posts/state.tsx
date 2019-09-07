import { Post } from "../../types";
import { LoadStatus } from "../utils";

export interface PostState {
  loadStatus: LoadStatus,
  posts: Post[],
}

export const initialPostState: PostState = {
  loadStatus: 'initial',
  posts: []
}
