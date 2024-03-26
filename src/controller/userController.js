import userModel from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

function generateToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

class User {
  async addUser(req, res) {
    try {
      const userData = req.body;
      const user = new userModel(userData);
      await user.save();
      res.status(StatusCodes.OK).json({
        message: "User created",
        status: 404,
        data: generateToken(user._id),
      });
    } catch (e) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Error occured!!" + e.message });
    }
  }
  async getAllUser(req, res) {
    try {
      const userData = await userModel.find({});
      res.status(StatusCodes.OK).json({ data: userData, message: "Success" });
    } catch (e) {
      res.status(StatusCodes.CONFLICT).json({ message: "Error" });
    }
  }
  async getUser(req, res) {
    try {
      if (!!req.params.id) {
        const userData = await userModel.findById(req.params.id);
        res.status(StatusCodes.OK).json({ data: userData, message: "Success" });
      }
    } catch (e) {
      res.status(StatusCodes.CONFLICT).json({ message: "Error" });
    }
  }
  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const userData = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(StatusCodes.OK).json({ message: "Success", data: userData });
    } catch (e) {
      res.status(StatusCodes.CONFLICT).json({ message: "Error" });
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      await userModel.findByIdAndDelete(id);
      res.status(StatusCodes.OK).json({ message: "successfully deleted" });
    } catch (e) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to delete" });
    }
  }

  async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await userModel.findOne({ email: email });
      if (String(user.password) === String(password)) {
        const token = generateToken(user._id);
        await user.token.push(token);
        await user.save();
        res.status(StatusCodes.OK).json({
          message: "User logged in",
          status: 404,
          data: token,
        });
      } else {
        throw new Error("Wrong Password");
      }
    } catch (e) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Error occured!!" + e.message });
    }
  }
}

export default new User();
