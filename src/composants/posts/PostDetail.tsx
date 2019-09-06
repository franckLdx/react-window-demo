import React from "react";
import { HomePageButton } from "../HomePageButton";
import { getPost, AppState } from "../../state";
import { useSelector } from "react-redux";
import { Post } from "../../types";
import { Header } from "semantic-ui-react";

interface PostDetailProps {
  postId: number;
}

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const post = useSelector((state: AppState) => getPost(state, postId));
  return <>
    <div>{post ? <Item {...post} /> : <NotFound />}</div>
    <HomePageButton />
  </>;
}

const NotFound: React.FC = () => <>Oups, could not found this post</>;

const Item: React.FC<Post> = ({ id, title, body }) =>
  <>
    <Header as='h3'>{title}</Header>
    {body}
  </>;