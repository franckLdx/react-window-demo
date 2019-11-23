import React, { useEffect } from "react";
import { Header } from 'semantic-ui-react';
import { useComputed, useAsObservableSource, Observer } from "mobx-react-lite";
import { Redirect } from "react-router";
import { useCommentsStore } from "../../../stores";
import { Loading } from "../../utils/Loading";
import { PostComment } from "../../../types";
import { CardItem, CardsItemGroup } from "../../utils/CardItem";
import { reaction } from "mobx";

export const CommentsList: React.FC<{ postId: number }> = ({ postId }) => {
  const commentsStore = useCommentsStore();
  const source = useAsObservableSource({ postId });

  // eslint-disable-next-line
  useEffect(
    reaction(() => source.postId, commentsStore.loadComments, { fireImmediately: true }),
    []
  );

  return <Observer>{() => {
    const commentsState = commentsStore.getCommentsState(postId);
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
  }}</Observer>
};

interface CommentsInfoProps {
  postId: number
}
const CommentsInfo: React.FC<CommentsInfoProps> = ({ postId }) => {
  const commentsStore = useCommentsStore();
  const comments = commentsStore.getCommentsState(postId).comments;
  const items = useComputed(
    () => comments.map(getItem),
    [comments]
  );
  return (<>
    <Header style={{ marginTop: '10px' }} as='h3' > Comments </Header>
    <CardsItemGroup>
      {items}
    </CardsItemGroup>
  </>
  );
}

const getItem = (comment: PostComment) =>
  <CardItem
    key={comment.id}
    header={comment.name}
    description={comment.body}
  />