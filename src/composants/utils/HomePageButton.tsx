import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';

const RawHomePageButton: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const onClick = useCallback(
    () => history.push('/'),
    [history]
  );
  return (
    <Button primary icon onClick={onClick}>
      <Icon name='home' />
    </Button>
  );
}

export const HomePageButton = withRouter(RawHomePageButton);