import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  search,
  getLatestNotes,
  updateVisibility,
} from "../routes/notesRoute.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.use(authUser);

router.post("/create-note", createNote);
router.get("/get-notes", getAllNotes);
router.get("/get-note-id/:id", getNoteById);
router.put("/update-note/:id", updateNote);
router.delete("/delete-note/:id", deleteNote);
router.get("/notes/search", search);
router.post("/notes/updateVisibility", updateVisibility);
router.get("/latest-notes", getLatestNotes);
export default router;
