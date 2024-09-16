import ChatController from "@/controller/ChatController";
import { Router } from "express";

const router = Router();

router.post("/", ChatController.createChat);
router.get("/", ChatController.getChatByMemberId);
router.post("/send", ChatController.sendMessage);

// router.post("/", ChatController.createChat);

export default router;
