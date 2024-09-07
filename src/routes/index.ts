import { Router } from "express";
import userRouters from "./user/userRoutes";

const router = Router();
router.use("/users", userRouters);

export default router;
