
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let notes = [
  { id: 1, title: "First note", content: "Practice REST methods" },
  { id: 2, title: "Second note", content: "Build confidence" }
];

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// GET one note by id
app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

// POST create a new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "title and content are required" });
  }

  const newNote = {
    id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    title,
    content
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// PATCH update part of a note
app.patch("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  const { title, content } = req.body;

  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;

  res.json(note);
});

// PUT replace an entire note
app.put("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "title and content are required" });
  }

  const updatedNote = { id, title, content };
  notes[index] = updatedNote;

  res.json(updatedNote);
});

// DELETE remove a note
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
