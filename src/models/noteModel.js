import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
    imp: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", notesSchema);
export default Note;
