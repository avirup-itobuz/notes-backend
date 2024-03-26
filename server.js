import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbConnect } from "./src/db/db.js";
import notesRoute from "./src/routes/notesRoute.js";
import userRoute from "./src/routes/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

dbConnect();

app.use("/user", userRoute);
app.use("/notes", notesRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is istening on port ${process.env.PORT}`);
});
