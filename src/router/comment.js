import express from "express";
import commentController from "../controller/comment.Controller.js";
const router  = express.Router();

router.post('/',commentController.createComment);
router.get('/:id',commentController.getComment);
router.get('/',commentController.getAllComment);
router.delete('/:id',commentController.deleteComment);
router.put('/:id',commentController.updateComment);

export default router;