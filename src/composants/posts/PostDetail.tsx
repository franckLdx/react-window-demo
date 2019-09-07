import React, { useEffect, useMemo } from "react";
import { HomePageButton } from "../utils/HomePageButton";
import { getPost, AppState, loadPost, getCommentsOfPost } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../types";
import { Header, Card } from "semantic-ui-react";
import { CardItem } from "../utils/CardItem";

interface PostDetailProps {
  postId: number;
}

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const post = useSelector((state: AppState) => getPost(state, postId));
  const dispatch = useDispatch();
  useEffect(() => { dispatch(loadPost(postId)) }, [dispatch, postId]);
  return (
    <>
      <div>{post ? <PostInfo {...post} /> : <NotFound />}</div>
      < HomePageButton />
    </>
  );
}

const NotFound: React.FC = () => <>Oups, could not found this post</>;

const PostInfo: React.FC<Post> = ({ id, title, body }) =>
  <>
    <Header as='h3'>{title}</Header>
    {body}
    <Comments postId={id} />
  </>;


const Comments: React.FC<{ postId: number }> = ({ postId }) => {
  const comments = useSelector((state: AppState) => getCommentsOfPost(state, postId));
  const items = useMemo(
    () => comments.map(
      comment => <CardItem header={comment.name} description={comment.body} />
    ),
    [comments]
  );
  return (
    <Card.Group>
      {items}
    </Card.Group>
  );
}
