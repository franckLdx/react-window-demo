import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router';
import { ListItem } from './ListItem';
import { loadPosts } from '../../../state';
import { Loading } from '../../utils/Loading';
import { getPostsLoadStatus } from '../../../state/postsState/selectors';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(loadPosts()) }, [dispatch]);
  const loadStatus = useSelector(getPostsLoadStatus)

  switch (loadStatus) {
    case 'initial':
    case 'loading':
      return <Loading />
    case 'loaded':
      return <ListItem />
    case 'error':
      return <Redirect to="/error" />
    default:
      console.error(`Unexpected loadstatus: ${loadStatus}`);
      return <Redirect to="/error" />
  }
}