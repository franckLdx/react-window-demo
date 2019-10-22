import React from 'react';
import { PostsStoreProvider } from './posts';
import { CommentsStoreProvider } from './comments';

export { usePostsStore } from './posts/context';
export { useCommentsStore } from './comments/context';

export const StoresProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  <>
    <PostsStoreProvider>
      <CommentsStoreProvider>
        {children}
      </CommentsStoreProvider>
    </PostsStoreProvider>
  </>

