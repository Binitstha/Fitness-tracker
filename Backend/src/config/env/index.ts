// src/config/env/index.ts
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

interface Config {
  port: number;
  databaseUrl: string;
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  EMAIL_USER: string;
  EMAIL_PASSWORD: string;
}

const env: Config = {
  port: parseInt(process.env.PORT || "5000", 10),
  databaseUrl: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
};

export default env;
