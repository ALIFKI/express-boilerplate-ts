import "module-alias/register";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./middlewares/ErrorHandler";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(helmet()); // Security headers
app.use(compression()); // GZIP compression
app.use(morgan("dev")); // Logging
app.use(cors()); // Cross-Origin Resource Sharing

// Routes
app.use("/api/v1/", router);

// Error handler
app.use(errorHandler);

export default app;
