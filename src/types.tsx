import { StringLiteral } from "@babel/types";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostComment {
  id: number;
  postId: number;
  name: string;
  body: string
  email: string;
}