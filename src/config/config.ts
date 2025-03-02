import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  dbConfig: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "postgres" as const,
  },
  jwtSecret: process.env.JWT_SECRET || "supersecretkey",
};
