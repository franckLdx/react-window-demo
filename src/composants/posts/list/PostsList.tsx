import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ListItem } from './ListItem';
import { getPostLoadStatus, loadPosts } from '../../../state';
import { Loading } from '../../utils/Loading';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const loadStatus = useSelector(getPostLoadStatus)
  useEffect(() => { dispatch(loadPosts()) }, [dispatch]);

  switch (loadStatus) {
    case 'initial':
    case 'loading':
      return <Loading />
    case 'error':
      return <Error />
    default:
      return <ListItem />
  }
}

const Error: React.FC = () =>
  <>
    Oups, sorry something went wrong.<br />Better luck next time
  </>;