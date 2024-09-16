import userController, { UserController } from "@/controller/userController";
import { Router } from "express";

const router = Router();

router.get("/", userController.getAllUsersController);
router.post("/", userController.createUserController);

export default router;
