import express from "express";
import authController from "../controller/auth.Controller.js";
const router = express.Router();

router.post("/login", authController.login);


export default router;