import express, { Router } from "express";
import user from "./user.js";
import post from "./post.js";
import comment from "./comment.js";
import like from "./like.js";
import path from "path";
const router = express.Router();


const defaultRouter = [
  {
    path: "/user",
    router: user
  },
  {
    path: "/post",
    router: post
  },
  {
    path: "/comment",
    router: comment
  },
  {
    path: "/like",
    router: like
  }
]

for (const route of defaultRouter) {
  router.use(route.path, route.router);
}

export default router;