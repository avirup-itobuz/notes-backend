import express from "express";
import User from "../controller/userController.js";

const router = express.Router();

router.post("/register", User.register);
router.get("/get-all-user", User.getAllUser);
router.get("/get-user/:id", User.getUser);
router.put("/update-user/:id", User.updateUser);
router.put("/delete-user/:id", User.deleteUser);
router.post("/login", User.login);
router.get("/verify-user/:token", User.verify);
export default router;
