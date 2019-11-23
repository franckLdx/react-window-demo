import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { autorun } from "mobx";
import { useObserver } from "mobx-react-lite";
import { Divider, Header } from "semantic-ui-react";
import { usePostsStore } from "../../../stores";
import { Loading } from "../../utils/Loading";
import { HomePageButton } from "../../utils/HomePageButton";
import { Post } from "../../../types";
import { AddCommentButton } from "../AddComments/AddComments";
import { CommentsList } from "./Comments";

interface PostDetailProps {
  postId: number;
}

export const PostDetail: React.FC<PostDetailProps> = ({ postId }) => {
  const postsStore = usePostsStore();

  // eslint-disable-next-line
  useEffect(autorun(() => { postsStore.loadPosts(); }), []);

  return useObserver(() => {
    switch (postsStore.loadStatus) {
      case 'initial':
      case 'loading':
        return <Loading />
      case 'loaded':
        const post = postsStore.getPost(postId);
        return post ? <PostInfo {...post} /> : <NotFound />
      case 'error':
        return <Redirect to="/error" />
      default:
        console.error(`Unexpected loadstatus: ${postsStore.loadStatus}`);
        return <Redirect to="/error" />
    }
  });
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
    <CommentsList postId={id} />
    <Divider />
    <HomePageButton />
    <AddCommentButton postId={id} />
  </>;