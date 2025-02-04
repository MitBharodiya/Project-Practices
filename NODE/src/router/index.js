import express, { Router } from "express";
import user from "./user.js";
const router = express.Router();


const defaultRouter = [
  {
    path: "/user",
    router: user
  }
]

for (const route of defaultRouter) {
  router.use(route.path, route.router);
}

export default router;