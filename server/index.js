import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/user.js";
import blogRouter from "./routes/blogs.js";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/user", userRouter);
app.use("/blogs", blogRouter);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
