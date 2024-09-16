"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("@/config/config"));
const services_1 = require("@/services");
const userValidator_1 = require("@/validators/userValidator");
const { validate, ValidationError, Joi } = require("express-validation");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
class UserController {
    loginController(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield userValidator_1.loginSchema.validateAsync(req.body, {
                    abortEarly: false,
                });
                const { email, password } = req.body;
                const user = yield services_1.userService.getUserByEmail(email);
                if (!user || !(yield user.comparePassword(password))) {
                    return res.status(401).json({
                        success: false,
                        statusCode: 401,
                        message: "Unauthenticated",
                    });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.jwtSecret, {
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
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    register(req, res, next) {
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
