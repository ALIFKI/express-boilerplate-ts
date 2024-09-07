"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("module-alias/register");
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)()); // Security headers
app.use((0, compression_1.default)()); // GZIP compression
app.use((0, morgan_1.default)("dev")); // Logging
app.use((0, cors_1.default)()); // Cross-Origin Resource Sharing
// Routes
app.use("/api/v1/", routes_1.default);
// Error handler
app.use(ErrorHandler_1.errorHandler);
exports.default = app;
