import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./modules/user/user.routes.js";
import teacherRoute from "./modules/teacher/teacher.route.js";
import classRoute from "./modules/class/class.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());


app.use("/auth", userRoute);
app.use('/',teacherRoute);
app.use('/class',classRoute);


app.use(errorMiddleware);

export default app;