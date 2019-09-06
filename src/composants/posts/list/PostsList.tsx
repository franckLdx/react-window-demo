import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from '../../../state';
import { Dimmer, Loader, Segment, Image } from 'semantic-ui-react';
import { ListItem } from './ListItem';
import { getPostLoadStatus } from '../../../state/selectors';

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

const Loading: React.FC = () => (
  <Segment>
    <Dimmer active>
      <Loader>Please wait while loading</Loader>
    </Dimmer>
    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
)

const Error: React.FC = () =>
  <>
    Oups, sorry something went wrong.<br />Better luck next time
  </>;