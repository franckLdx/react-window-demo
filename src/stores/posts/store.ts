
import { runInAction, configure } from 'mobx';
import { services } from '../../services';
import { Post } from '../../types';
import { LoadStatus, canLoad } from '../utils';

configure({ enforceActions: "observed" })

export function createStore() {
  return {
    ...initialStore,

    async loadPosts() {
      if (!canLoad(this.loadStatus)) {
        return;
      }
      runInAction("posts loading", () => this.loadStatus = 'loading');
      const posts = await services.loadPosts()
      runInAction("posts loaded", () => {
        this.loadStatus = 'loaded';
        this.posts = posts;
      })
    },

    getPost(postId: number) {
      return this.posts.find(post => post.id === postId);
    },
  }
};

const initialStore: InitialStore = {
  loadStatus: 'initial',
  posts: [],
}

interface InitialStore {
  loadStatus: LoadStatus;
  posts: Post[];
}

export type Store = ReturnType<typeof createStore>
