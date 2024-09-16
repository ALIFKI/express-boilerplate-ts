import config from "@/config/config";
import { userService } from "@/services";
import { createUserSchema, loginSchema } from "@/validators/userValidator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
const { validate, ValidationError, Joi } = require("express-validation");
import jwt from "jsonwebtoken";

export class UserController {
  public async loginController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await loginSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      const { email, password } = req.body;
      const user = await userService.getUserByEmail(email);
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Unauthenticated",
        });
      }
      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: "1h",
      });
      res.status(200).json({
        success: true,
        token,
        type: "Bearer",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }
  public async getAllUsersController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await createUserSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      const user = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      next(error);
    }
  }

  public async createUserController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await createUserSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      const user = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      next(error);
    }
  }
}

const userController = new UserController();
export default userController;
