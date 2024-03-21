import express from "express";
import User from "../routes/userRoute.js";

const router = express.Router();

router.post("/add-user", User.addUser);
router.get("/get-all-user", User.getAllUser);
router.get("/get-user/:id", User.getUser);
router.put("/update-user/:id", User.updateUser);
router.put("/delete-user/:id", User.deleteUser);
export default router;
