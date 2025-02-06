import express from "express";
import postController from "../controller/post.Controller.js";
const router  = express.Router();

router.post('/',postController.createPost);
router.get('/:id',postController.getPost);
router.get('/',postController.getAllPost);
router.put('/:id',postController.updatePost);
router.delete('/:id',postController.deletePost);

export default router;