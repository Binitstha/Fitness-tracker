// src/config/index.ts
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface Config {
  port: number;
  databaseUrl: string;
}

const env: Config = {
  port: parseInt(process.env.PORT || "5000", 10),
  databaseUrl: process.env.DATABASE_URL || "",
};

export default env;
