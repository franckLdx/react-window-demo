import { StringLiteral } from "@babel/types";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}