import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppState, loadPosts } from '../../state';
import { DisplayPosts } from './DisplayPosts';
import { Dimmer, Loader, Segment, Image } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router';


export const PostsList: React.FC<RouteComponentProps<any>> = (props) => {
  const dispatch = useDispatch();
  const loadStatus = useSelector((state: AppState) => state.posts.loadStatus)
  useEffect(() => { dispatch(loadPosts()) }, [dispatch]);

  switch (loadStatus) {
    case 'initial':
    case 'loading':
      return <Loading />
    case 'error':
      return <>Oups, sorry something went wrong.<br />Better luck next time</>
    default:
      return <DisplayPosts {...props} />
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