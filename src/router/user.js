import express from "express";
import userController from "../controller/user.Controller.js"; // Ensure this path is correct
const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id',userController.getUser);
router.get('/',userController.getAllUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

export default router;
