import React, { useEffect, useMemo } from "react";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { HomePageButton } from "../utils/HomePageButton";
import { loadPosts, loadCommentsOfPost, makeGetPost, makeGetCommentsOfPost } from "../../state";
import { Post } from "../../types";
import { Header, Card, Divider } from "semantic-ui-react";
import { CardItem } from "../utils/CardItem";
import { Loading } from "../utils/Loading";
import { getPostsLoadStatus, makeGetCommentsOfPostLoadStatus } from "../../state/postsState/selectors";
import { AddCommentButton } from "./AddComments";

interface PostDetailProps {
  postId: number;
}

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(loadPosts()); }, [dispatch]);
  const loadStatus = useSelector(getPostsLoadStatus)
  const getPost = useMemo(() => makeGetPost(postId), [postId])
  const post = useSelector(getPost);

  switch (loadStatus) {
    case 'initial':
    case 'loading':
      return <Loading />
    case 'loaded':
      return post ? <PostInfo {...post} /> : <NotFound />
    case 'error':
      return <Redirect to="/error" />
    default:
      console.error(`Unexpected loadstatus: ${loadStatus}`);
      return <Redirect to="/error" />
  }
};

const NotFound: React.FC = () => <>
  Oups, could not found this
  <Divider />
  <HomePageButton />
</>;

const PostInfo: React.FC<Post> = ({ id, title, body }) =>
  <>
    <Header as='h3'>{title}</Header>
    {body}
    <Divider />
    <Comments postId={id} />
    <Divider />
    <HomePageButton /> <AddCommentButton postId={id} />
  </>;


const Comments: React.FC<{ postId: number }> = ({ postId }) => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(loadCommentsOfPost(postId)); }, [dispatch, postId]);
  const getCommentsOfPostLoadStatus = makeGetCommentsOfPostLoadStatus(postId);
  const loadStatus = useSelector(getCommentsOfPostLoadStatus);
  switch (loadStatus) {
    case 'initial':
    case 'loading':
      return <Loading />
    case 'loaded':
      return <CommentsInfo postId={postId} />
    case 'error':
      return <Redirect to="/error" />
    default:
      console.error(`Unexpected loadstatus: ${loadStatus}`);
      return <Redirect to="/error" />
  }
}

interface CommentsInfoProps {
  postId: number
}
const CommentsInfo: React.FC<CommentsInfoProps> = ({ postId }) => {
  const getCommentsOfPost = useMemo(() => makeGetCommentsOfPost(postId), [postId]);
  const comments = useSelector(getCommentsOfPost);
  const items = useMemo(
    () => comments.map(
      comment => <CardItem key={comment.id} header={comment.name} description={comment.body} />
    ),
    [comments]
  );
  return (
    <>
      <Header style={{ marginTop: '10px' }} as='h3'>Comments</Header>
      <Card.Group>
        {items}
      </Card.Group>
    </>
  );
}
