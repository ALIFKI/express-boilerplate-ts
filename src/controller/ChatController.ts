import config from "@/config/config";
import Chat from "@/models/chat";
import Member from "@/models/member";
import Message from "@/models/messages";
import { User } from "@/models/user";
import { userService } from "@/services";
import { createChatValidator } from "@/validators/ChatValidator";
import { createUserSchema, loginSchema } from "@/validators/userValidator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
const { validate, ValidationError, Joi } = require("express-validation");
import jwt, { JwtPayload } from "jsonwebtoken";
import moment from "moment";

export class _ChatController {
  public async createChat(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    try {
      const decoded = jwt.verify(
        token as string,
        config.jwtSecret
      ) as JwtPayload;

      const id = decoded?.userId;
      const sender = await userService.getUserByID(id);
      await createChatValidator.validateAsync(req.body, {
        abortEarly: false,
      });
      const { chatName, chatType, chatMembersId } = req.body;
      const chat = await Chat.create({
        chat_name: chatName,
        chat_type: chatType,
      });

      const member_chat = await Member.bulkCreate([
        {
          chat_id: chat.id,
          user_id: id, //id of user sender
        },
        {
          chat_id: chat.id,
          user_id: chatMembersId, //id of reciever
        },
      ]);

      return res.status(200).json({
        success: true,
        statusCode: 201,
        data: {
          member_chat,
          sender,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async getChatByMemberId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token as string, config.jwtSecret) as JwtPayload; // assume userId is passed as a route parameter

    const userId = decoded.userId;
    try {
      const members = await Member.findAll({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Chat,
            as: "Chat",
            include: [
              {
                model: Member,
                as: "Members",
                include: [
                  {
                    model: User,
                    as: "User",
                  },
                ],
              },
            ],
          },
        ],
      });

      // const members = await Chat.findAll({
      //   include: {
      //     model: Member,
      //     as: "Members",
      //     where: {
      //       user_id: userId,
      //     },
      //   },
      // });

      // console.log(members);

      const chats = members.map((member) => {
        return member;
      });

      return res.status(200).json({
        success: true,
        statusCode: 200,
        data: chats,
      });
    } catch (err) {
      next(err);
    }
  }

  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token as string, config.jwtSecret) as JwtPayload;
    const userId = decoded.userId;
    const { chatId, message, type } = req.body;

    try {
      // Find the chat instance
      const chat = await Chat.findByPk(chatId, {
        include: [
          {
            model: Member,
            as: "Members",
            where: {
              user_id: userId,
            },
          },
        ],
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "Chat not found",
        });
      }

      // Create a new message instance
      const messageInstance = await Message.create({
        chat_id: chatId,
        sender_id: userId,
        content: message,
        message_type: type,
        send_at: new Date(),
        is_read: false,
      });

      // Return the created message instance
      return res.status(201).json({
        success: true,
        statusCode: 201,
        data: messageInstance,
      });
    } catch (err) {
      next(err);
    }
  }
}

const ChatController = new _ChatController();
export default ChatController;
