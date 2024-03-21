import { StatusCodes } from "http-status-codes";
import Note from "../models/noteModel.js";
export async function createNote(req, res) {
  try {
    const title = req.body.title;
    const note = await Note.find({ title: title });
    if (note.length > 0) {
      res.status(StatusCodes.CONFLICT).json({
        message: "Note with same title already present",
        data: null,
        status: 404,
      });
      return;
    }
    const newNote = new Note(req.body);
    await newNote.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "Success", data: note, status: 200 });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Error", data: null, status: 404 });
  }
}

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res
      .status(StatusCodes.OK)
      .json({ data: notes, message: "success", status: 200 });
  } catch (err) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Error", data: null, status: 404 });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Note not found", data: null, status: 404 });
    }
    res
      .status(StatusCodes.OK)
      .json({ data: note, message: "success", status: 202 });
  } catch (err) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Error", data: null, status: 404 });
  }
}

export async function updateNote(req, res) {
  try {
    const id = req.params.id;
    const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(StatusCodes.OK)
      .json({ data: note, message: "success", status: 200 });
  } catch (err) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Error", data: null, status: 404 });
  }
}

export async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id);
    res
      .status(StatusCodes.OK)
      .json({ data: note, message: "successfully deleted", status: 200 });
  } catch (err) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Error", data: null, status: 404 });
  }
}

export async function search(req, res) {
  try {
    const title = req.query.query;
    console.log(title);
    const note = await Note.find({ title: title });
    res
      .status(StatusCodes.OK)
      .json({ data: note, message: "success", status: 200 });
  } catch (err) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Error", data: null, status: 404 });
  }
}

export async function getLatestNotes(req, res) {
  try {
    const notes = await Note.find().sort({ updatedAt: "desc" });
    res
      .status(StatusCodes.OK)
      .json({ data: notes.slice(0, 3), message: "success", status: 200 });
  } catch (err) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Error...", data: null, status: 200 });
  }
}

export async function updateVisibility(req, res) {
  try {
    const notes = await Note.updateMany(
      { _id: { $in: req.body.updateIds } },
      { isVisible: false }
    );
    res
      .status(StatusCodes.OK)
      .json({ data: notes.slice(0, 3), message: "success", status: 200 });
  } catch (err) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Error...", data: null, status: 200 });
  }
}
