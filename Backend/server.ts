import express, { Request, Response } from "express";
import env from "./src/config/env";
import { errorHandler } from "./src/errors/error.handler";
import authRoutes from "./src/routes/auth/auth.routes";
import personalizationRoutes from "./src/routes/account/personalization.routes";
import workout from "./src/routes/workout/workout.routes";
import goal from "./src/routes/goal/goal.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

const port = env.port || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/account", personalizationRoutes);
app.use("/workout", workout);
app.use("/goal", goal);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the fitness tracker API!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
