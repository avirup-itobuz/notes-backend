import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authUser = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization;
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("User is not authorized");
      }
      req.id = decoded.id;
      next();
    });
  } catch (err) {
    next(err);
  }
};

export default authUser;
