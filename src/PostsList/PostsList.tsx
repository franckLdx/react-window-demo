import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppState, loadPosts } from '../state';
import { DisplayPosts } from './DisplayPosts';


export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const loadStatus = useSelector((state: AppState) => state.posts.loadStatus)
  useEffect(() => { dispatch(loadPosts()) }, [dispatch]);

  switch (loadStatus) {
    case 'initial':
    case 'loading':
      return <>Please wait</>
    case 'error':
      return <>Oups, sorry something went wrong.<br />Better luck next time</>
    default:
      return <DisplayPosts />
  }
}

