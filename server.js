import express from "express";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { dbConnect } from "./src/db/db.js";
import notesRoute from "./src/routes/notesRoute.js";
import userRoute from "./src/routes/userRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

dbConnect();

app.use("/user", userRoute);
app.use("/notes", notesRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(StatusCodes.CONFLICT)
    .json({ message: err.message, data: null, status: 404 });
});

app.listen(process.env.PORT, () => {
  console.log(`server is istening on port ${process.env.PORT}`);
});
