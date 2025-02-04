import express, { Router } from "express";
import user from "./user.js";
import blog from "./blog.js";
const router = express.Router();


const defaultRouter = [
  {
    path: "/user",
    router: user
  },
  {
    path: "/blog",
    router: blog
  }
]

for (const route of defaultRouter) {
  router.use(route.path, route.router);
}

export default router;