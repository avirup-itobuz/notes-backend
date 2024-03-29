import { StatusCodes } from "http-status-codes";
import Note from "../models/noteModel.js";

export async function createNote(req, res, next) {
  try {
    const title = req.body.title;
    const note = await Note.find({ title: title, userId: req.id });
    if (note.length > 0) {
      res.status(StatusCodes.CONFLICT).json({
        message: "Note with same title already present",
        data: null,
        status: 404,
      });
      return;
    }
    const newNote = new Note({
      title: req.body.title,
      description: req.body.description,
      userId: req.id,
    });
    await newNote.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "Success", data: note, status: 200 });
  } catch (err) {
    next(err);
  }
}

export async function getAllNotes(req, res, next) {
  try {
    const notes = await Note.find({ userId: req.id });
    if (notes.length <= 0) throw new Error("No Notes found for this user");
    res
      .status(StatusCodes.OK)
      .json({ data: notes, message: "success", status: 200 });
  } catch (err) {
    next(err);
  }
}

export async function changeVisiblity(req, res, next) {
  try {
    const id = req.params.id;
    const status = req.query.status;
    const note = await Note.find({ _id: id, userId: req.id });
    if (note.length === 0) throw new Error("No Notes found with this id");
    note.isVisible = status;
    note.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "success", data: note, status: 200 });
  } catch (err) {
    next(err);
  }
}

export async function deleteHiddenNotes(req, res, next) {
  try {
    await Note.deleteMany({ isVisible: false, userId: req.id });
    res
      .status(StatusCodes.OK)
      .json({ data: "Success", message: "Success", status: 200 });
  } catch (err) {
    next(err);
  }
}

export async function getNoteById(req, res, next) {
  try {
    const note = await Note.find({ _id: req.params.id, userId: req.id });
    if (!note) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Note not found", data: null, status: 404 });
    }
    res
      .status(StatusCodes.OK)
      .json({ data: note, message: "success", status: 202 });
  } catch (err) {
    next(err);
  }
}

export async function updateNote(req, res, next) {
  try {
    const id = req.params.id;
    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.id },
      req.body,
      { new: true }
    );
    res
      .status(StatusCodes.OK)
      .json({ data: note, message: "success", status: 200 });
  } catch (err) {
    next(err);
  }
}

export async function deleteNote(req, res, next) {
  try {
    const id = req.params.id;
    const note = await Note.findOneAndDelete({ _id: id, userId: req.id });
    res
      .status(StatusCodes.OK)
      .json({ data: note, message: "successfully deleted", status: 200 });
  } catch (err) {
    next(err);
  }
}

export async function search(req, res, next) {
  try {
    const title = req.query.title;
    console.log(title);
    const note = await Note.find({
      title: { $regex: title, $options: "i" },
      userId: req.id,
    });
    console.log(note);
    res
      .status(StatusCodes.OK)
      .json({ data: note, message: "success", status: 200 });
  } catch (err) {
    next(err);
  }
}

export async function getLatestNotes(req, res, next) {
  try {
    const notes = await Note.find({ userId: req.id }).sort({
      updatedAt: "desc",
    });
    res
      .status(StatusCodes.OK)
      .json({ data: notes.slice(0, 3), message: "success", status: 200 });
  } catch (err) {
    next(err);
  }
}
