"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const userRoutes_1 = tslib_1.__importDefault(require("./user/userRoutes"));
const router = (0, express_1.Router)();
router.use("/users", userRoutes_1.default);
exports.default = router;
