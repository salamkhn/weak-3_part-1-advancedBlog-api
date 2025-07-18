import { config } from "dotenv";
import { dbsCon } from "./db/dbCon.js";
import express from "express";
import { userRouter } from "./routers/userRouter.js";
import { contentRouter } from "./routers/contentRouter.js";
import { errorHandler } from "./authentication/errorHandler.js";
import { looger } from "./authentication/logermiddleware.js";
import { profileRouter } from "./routers/profileRouter.js";
import { categoryRouter } from "./routers/categoryRouter.js";
config();
dbsCon();

const app = express();

app.use(express.json());
app.use(looger);

//user
app.use("/api/blog/user", userRouter);

//content
app.use("/api/blog/content", contentRouter);

//profile
app.use("/api/blog/profile", profileRouter);

//category
app.use("/api/blog/category", categoryRouter);

//listen
app.use(errorHandler);
const port = process.env.port || 222;
app.listen(port, () => {
  console.log(`server listen at ${port}`);
});
