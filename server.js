import { dbsCon } from "./db/dbCon.js";
import express from "express";
import { userRouter } from "./routers/userRouter.js";
import { contentRouter } from "./routers/contentRouter.js";
import { errorHandler } from "./authentication/errorHandler.js";
import { looger } from "./authentication/logermiddleware.js";
dbsCon();

const app = express();

app.use(express.json());
app.use(looger);

//user
app.use("/api/blog/user", userRouter);

//Router
app.use("/api/blog/content", contentRouter);

//error handaler middleware
//listen
const port = 222;
app.listen(port, () => {
  console.log(`server listen at ${port}`);
});

app.use(errorHandler);
