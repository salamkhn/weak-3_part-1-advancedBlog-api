import { dbsCon } from "./db/dbCon.js";
import express from "express";
import { userRouter } from "./routers/userRouter.js";
const app = express();
dbsCon();

app.use(express.json());

//user
app.use("/api/blog/user", userRouter);

//listen
const port = 222;
app.listen(port, () => {
  console.log(`server listen at ${port}`);
});
