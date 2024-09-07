"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.log(err, "middleware");
    if (err.name == "ValidationError") {
        const humanReadableErrors = err.details.map((detail) => `${detail.message}`);
        return res.status(400).json({
            success: false,
            statusCode: 400,
            error: "Validation",
            message: humanReadableErrors,
            // data: err,
        });
    }
    res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Server Error",
        error: err.message,
    });
};
exports.errorHandler = errorHandler;
