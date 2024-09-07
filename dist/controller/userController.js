"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const services_1 = require("@/services");
const userValidator_1 = require("@/validators/userValidator");
const { validate, ValidationError, Joi } = require("express-validation");
class UserController {
    getAllUsersController(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield services_1.userService.getAllUsers();
                res.status(200).json({ success: true, data: users });
            }
            catch (error) {
                next(error);
            }
        });
    }
    createUserController(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield userValidator_1.createUserSchema.validateAsync(req.body, {
                    abortEarly: false,
                });
                const user = yield services_1.userService.createUser(req.body);
                res.status(201).json({ success: true, data: user });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
const userController = new UserController();
exports.default = userController;
