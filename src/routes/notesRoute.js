import express from "express";
import {
  createNote,
  getAllNotes,
  changeVisiblity,
  deleteHiddenNotes,
  getNoteById,
  updateNote,
  deleteNote,
  search,
  getLatestNotes,
} from "../controller/notesController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.use(authUser);

router.post("/create-note", createNote);
router.get("/get-notes", getAllNotes);
router.post("/change-visibility/:id", changeVisiblity);
router.delete("/delete-hidden-notes", deleteHiddenNotes);
router.get("/get-note-id/:id", getNoteById);
router.put("/update-note/:id", updateNote);
router.delete("/delete-note/:id", deleteNote);
router.get("/notes/search", search);
router.get("/latest-notes", getLatestNotes);
export default router;
