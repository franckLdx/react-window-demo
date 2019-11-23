import { configure, runInAction } from "mobx";
import { LoadStatus, canLoad } from "../utils";
import { PostComment } from "../../types";
import { services } from "../../services";

configure({ enforceActions: "observed" })

export function createStore() {
  return {
    byPost: new Map<number, CommentsState>(),

    async loadComments(postId: number) {
      const commentsState = this.getCommentsState(postId);
      if (!canLoad(commentsState.loadStatus)) {
        return;
      }
      this.byPost.set(postId, { ...commentsState, loadStatus: 'loading' });
      try {
        const comments = await services.loadCommentsOfPost(postId);
        runInAction("comments loaded", () => this.byPost.set(postId, { ...commentsState, comments, loadStatus: 'loaded' }));
      } catch (err) {
        runInAction("loading comments failed", () => this.byPost.set(postId, { ...commentsState, loadStatus: 'error' }));
      }
    },

    getCommentsState(postId: number) {
      return this.byPost.get(postId) || Object.assign({}, initialComments);
    }
  }
}

const initialComments: Readonly<CommentsState> = {
  loadStatus: 'initial',
  comments: [],
}

interface CommentsState {
  loadStatus: LoadStatus;
  comments: PostComment[];
}

export type Store = ReturnType<typeof createStore>
