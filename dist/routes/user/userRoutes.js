"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userController_1 = tslib_1.__importDefault(require("@/controller/userController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", userController_1.default.getAllUsersController);
router.post("/", userController_1.default.createUserController);
exports.default = router;
