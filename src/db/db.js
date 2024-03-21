import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO;

export function dbConnect() {
  mongoose.connect(URI);
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
  mongoose.connection.once("open", () => {
    console.log("Sucessfully connected to db");
  });
}
