import userController, { UserController } from "@/controller/userController";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.post("/login", userController.loginController);
router.post("/register", userController.register);

export default router;
