import { AppState } from "../state";

export const getPostLoadStatus = (state: AppState) => state.posts.loadStatus;

export const getPosts = (state: AppState) => state.posts.posts;

export const getPost = (state: AppState, id: number) => getPosts(state).find(post => post.id === id)
