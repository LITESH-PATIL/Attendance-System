import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./modules/user/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());


app.use("/auth", userRoute);
app.use("/auth", userRoute);
app.use("/auth", userRoute);

app.use(errorMiddleware);

export default app;