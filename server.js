import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbConnect } from "./src/db/db.js";
import notesRouteHandler from "./src/controller/notesRouteHandler.js";
import userRouteHandler from "./src/controller/userRouteHandler.js";

dotenv.config();

const app = express();

app.use(express.json());

dbConnect();

app.use("/user", userRouteHandler);
app.use("/notes", notesRouteHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is istening on port ${process.env.PORT}`);
});
