import { LoadStatus } from "../utils";

export interface PostState {
  postId: number;
  commentStatus: LoadStatus;
}

export interface PostsState {
  listStatus: LoadStatus;
  postState: PostState[];
}

export const initialPostState: PostsState = {
  listStatus: 'initial',
  postState: [],
}