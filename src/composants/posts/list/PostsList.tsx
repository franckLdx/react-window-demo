import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ListItem } from './ListItem';
import { getPostLoadStatus, loadPosts } from '../../../state';
import { Loading } from '../../utils/Loading';
import { Redirect } from 'react-router';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(loadPosts()) }, [dispatch]);
  const loadStatus = useSelector(getPostLoadStatus)

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