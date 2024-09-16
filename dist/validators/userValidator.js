"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createUserSchema = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
// Define the schema for creating a user
exports.createUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required().messages({
        "string.base": "Name should be a type of text",
        "string.empty": "Name cannot be empty",
        "any.required": "Name is a required field",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.base": "Email should be a type of text",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is a required field",
    }),
    password: joi_1.default.string().min(6).required().messages({
        "string.base": "Password should be a type of text",
        "string.min": "Password should be at least 6 characters long",
        "any.required": "Password is a required field",
    }),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.base": "Email should be a type of text",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is a required field",
    }),
    password: joi_1.default.string().min(6).required().messages({
        "string.base": "Password should be a type of text",
        "string.min": "Password should be at least 6 characters long",
        "any.required": "Password is a required field",
    }),
});
