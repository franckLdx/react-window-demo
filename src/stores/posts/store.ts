import { runInAction, configure } from 'mobx';
import { services } from '../../services';
import { Post } from '../../types';
import { LoadStatus, canLoad } from '../utils';

configure({ enforceActions: "observed" })

export function createPostsStore() {
  return {
    loadStatus: 'initial' as LoadStatus,
    posts: [] as Post[],

    async loadPosts() {
      if (!canLoad(this.loadStatus)) {
        return;
      }
      this.loadStatus = 'loading';
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

export type Store = ReturnType<typeof createPostsStore>
