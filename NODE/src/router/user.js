import express from "express";
import userController from "../controller/user.Controller.js"; // Ensure this path is correct
const router = express.Router();

router.post('/', userController.createUser);

export default router;
