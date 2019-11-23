import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { ListItem } from './ListItem';
import { Loading } from '../../utils/Loading';
import { Observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { usePostsStore } from '../../../stores';

export const PostsList: React.FC = () => {
  const postsStore = usePostsStore();
  // eslint-disable-next-line
  useEffect(autorun(() => { postsStore.loadPosts() }), []);

  return <Observer>{() => {
    switch (postsStore.loadStatus) {
      case 'initial':
      case 'loading':
        return <Loading />
      case 'loaded':
        return <ListItem />
      case 'error':
        return <Redirect to="/error" />
      default:
        console.error(`Unexpected loadstatus: ${postsStore.loadStatus}`);
        return <Redirect to="/error" />
    }
  }}</Observer>
};