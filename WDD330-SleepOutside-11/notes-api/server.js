
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

let notes = [
  { id: 1, title: "First note", content: "Practice REST methods" },
  { id: 2, title: "Second note", content: "Build confidence" }
];

let products = [
  { id: 1, name: "Ajax Tent - 3 Person", brand: "Marmot", price: 199.99, category: "tents" },
  { id: 2, name: "Talus Tent - 4 Person", brand: "The North Face", price: 199.99, category: "tents" },
  { id: 3, name: "Rimrock Tent - 2 Person", brand: "The North Face", price: 179.99, category: "tents" },
  { id: 4, name: "Alpine Guide Tent - 3 Person", brand: "The North Face", price: 349.99, category: "tents" }
];

// GET all products
app.get("/products", (req, res) => {
  const limit = Number(req.query.limit);

  if (Number.isFinite(limit) && limit > 0) {
    return res.json(products.slice(0, limit));
  }

  res.json(products);
});

// GET one product by id
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// POST create a product
app.post("/products", (req, res) => {
  const { name, brand, price, category } = req.body;

  if (!name || !brand || price === undefined) {
    return res.status(400).json({ message: "name, brand, and price are required" });
  }

  const normalizedName = String(name).trim().toLowerCase();
  const normalizedBrand = String(brand).trim().toLowerCase();
  const normalizedCategory = String(category || "tents").trim().toLowerCase();
  const normalizedPrice = Number(price);

  const duplicate = products.find((product) => {
    return (
      product.name.trim().toLowerCase() === normalizedName &&
      product.brand.trim().toLowerCase() === normalizedBrand &&
      Number(product.price) === normalizedPrice &&
      String(product.category || "tents").trim().toLowerCase() === normalizedCategory
    );
  });

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate product already exists", product: duplicate });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    brand,
    price: Number(price),
    category: category || "tents"
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PATCH update part of a product
app.patch("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, brand, price, category } = req.body;

  if (name !== undefined) product.name = name;
  if (brand !== undefined) product.brand = brand;
  if (price !== undefined) product.price = Number(price);
  if (category !== undefined) product.category = category;

  res.json(product);
});

// PUT replace an entire product
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, brand, price, category } = req.body;

  if (!name || !brand || price === undefined) {
    return res.status(400).json({ message: "name, brand, and price are required" });
  }

  const updatedProduct = {
    id,
    name,
    brand,
    price: Number(price),
    category: category || "tents"
  };

  products[index] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE remove a product
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);
  res.status(204).send();
});

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
