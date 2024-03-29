import userModel from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

function generateToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
class User {
  async register(req, res) {
    try {
      const userData = req.body;
      const x = await userModel.find({ email: userData.email });
      if (x.length > 0) throw new Error("User already registered");
      if (!validateEmail(userData.email)) {
        throw new Error("invalid Email");
      }
      const user = new userModel(userData);
      await user.save();
      res.status(StatusCodes.OK).json({
        message: "User created",
        status: 200,
      });
    } catch (e) {
      res.status(StatusCodes.CONFLICT).json({ message: e.message });
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
      res.status(StatusCodes.CONFLICT).json({ message: e.message });
    }
  }

  async verify(req, res) {
    const token = req.params.token;
    console.log(token);
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(StatusCodes.UNAUTHORIZED);
          throw new Error("User is not authorized");
        }

        const user = userModel.findById(token);
        console.log(user);
        if (user)
          res
            .status(200)
            .json({ message: "user authenticated", success: true });
      });
    } catch (e) {
      res.status(404).json({ message: e.message, success: false });
    }
  }
}

export default new User();
