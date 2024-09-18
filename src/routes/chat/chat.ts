import { _ChatController } from "@/controller/ChatController";
import { IOHelper } from "@/lib/SocketIO";
import { io } from "@/server";
import { Router } from "express";

const ioHelper = new IOHelper(io);
const ChatController = new _ChatController(ioHelper);

const router = Router();

router.post("/", ChatController.createChat);
router.get("/", ChatController.getChatByMemberId);
router.post("/send", ChatController.sendMessage);
router.get("/:chatId/messages", ChatController.getMessagesByChatId);

// router.post("/", ChatController.createChat);

export default router;
