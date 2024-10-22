import express, { Request, Response } from "express";
import env from "./src/config/env";
import { errorHandler } from "./src/errors/error.handler";
import authRoutes from "./src/routes/auth/auth.routes";
import personalizationRoutes from "./src/routes/account/personalization.routes";
import workout from "./src/routes/workout/workout.routes";
import goal from "./src/routes/goal/goal.routes";
import meal from "./src/routes/meal/meal.routes";
import water from "./src/routes/water/water.routes";
import blog from "./src/routes/blog/blog.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const port = env.port;

const allowedOrigins = [
  "http://localhost:3000",
  "https://fitness-tracker-liard.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/meal", meal);
app.use("/water", water);
app.use("/blog", blog);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the fitness tracker API!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
