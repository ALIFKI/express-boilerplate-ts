import { Router } from "express";
import userRouters from "./user/userRoutes";
import auth from "./auth/auth";
import chat from "./chat/chat";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import config from "@/config/config";

// middleware?
const Auth = new AuthMiddleware(config.jwtSecret);

const router = Router();
router.use("/auth", auth);
router.use("/users", Auth.hasToken, userRouters);
router.use("/chat", Auth.hasToken, chat);

export default router;
