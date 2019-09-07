import React from 'react';
import { Dimmer, Loader, Segment, Image } from 'semantic-ui-react';

export const Loading: React.FC = () =>
  (<Segment>
    <Dimmer active>
      <Loader>Please wait while loading</Loader>
    </Dimmer>
    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
  );
