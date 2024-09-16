"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const userRoutes_1 = tslib_1.__importDefault(require("./user/userRoutes"));
const auth_1 = tslib_1.__importDefault(require("./auth/auth"));
const chat_1 = tslib_1.__importDefault(require("./chat/chat"));
const AuthMiddleware_1 = tslib_1.__importDefault(require("@/middlewares/AuthMiddleware"));
const config_1 = tslib_1.__importDefault(require("@/config/config"));
// middleware?
const Auth = new AuthMiddleware_1.default(config_1.default.jwtSecret);
const router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/users", Auth.hasToken, userRoutes_1.default);
router.use("/chat", Auth.hasToken, chat_1.default);
exports.default = router;
