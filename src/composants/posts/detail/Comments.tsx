import React, { useEffect } from "react";
import { Card, Header } from 'semantic-ui-react';
import { observer, useComputed } from "mobx-react-lite";
import { Redirect } from "react-router";
import { useCommentsStore } from "../../../stores";
import { Loading } from "../../utils/Loading";
import { PostComment } from "../../../types";
import { CardItem } from "../../utils/CardItem";

export const Comments: React.FC<{ postId: number }> = observer(({ postId }) => {
  const commentsStore = useCommentsStore();
  const commentsState = commentsStore.getCommentsState(postId);

  // eslint-disable-next-line
  useEffect(() => { commentsStore.loadComments(postId) }, []);

  switch (commentsState.loadStatus) {
    case 'initial':
    case 'loading':
      return <Loading />
    case 'loaded':
      return <CommentsInfo postId={postId} />
    case 'error':
      return <Redirect to="/error" />
    default:
      console.error(`Unexpected loadstatus: ${commentsState.loadStatus}`);
      return <Redirect to="/error" />
  }
});

interface CommentsInfoProps {
  postId: number
}
const CommentsInfo: React.FC<CommentsInfoProps> = ({ postId }) => {
  const commentsStore = useCommentsStore();
  const { comments } = commentsStore.getCommentsState(postId);

  const items = useComputed(
    () => comments.map(getItem),
    [comments]
  );
  return (<>
    <Header style={{ marginTop: '10px' }} as='h3' > Comments </Header>
    <Card.Group>
      {items}
    </Card.Group>
  </>
  );
}

const getItem = (comment: PostComment) =>
  <CardItem
    key={comment.id}
    header={comment.name}
    description={comment.body}
  />