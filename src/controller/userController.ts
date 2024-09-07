import { userService } from "@/services";
import { createUserSchema } from "@/validators/userValidator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
const { validate, ValidationError, Joi } = require("express-validation");

export class UserController {
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
