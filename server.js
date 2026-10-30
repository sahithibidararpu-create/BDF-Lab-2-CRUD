const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, "database.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("Connected to SQLite database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// Home route
app.get("/", (req, res) => {
  res.send("Lab 2 Server is Running");
});

// 1. Get all books
app.get("/books/", async (req, res) => {
  try {
    const books = await db.all("SELECT * FROM book ORDER BY id");
    res.json(books);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 2. Get one book
app.get("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await db.get("SELECT * FROM book WHERE id = ?", [bookId]);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 3. Add a book
app.post("/books/", async (req, res) => {
  try {
    const { title, author, price, pages } = req.body;
    if (!title || !author || price === undefined || pages === undefined) {
      return res
        .status(400)
        .json({ error: "title, author, price and pages are required" });
    }
    const result = await db.run(
      "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)",
      [title, author, price, pages]
    );
    res.status(201).json({ message: "Book added successfully", id: result.lastID });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 4. Update a book
app.put("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, author, price, pages } = req.body;
    if (!title || !author || price === undefined || pages === undefined) {
      return res
        .status(400)
        .json({ error: "title, author, price and pages are required" });
    }
    const result = await db.run(
      "UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?",
      [title, author, price, pages, bookId]
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book updated successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 5. Delete a book
app.delete("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;
    const result = await db.run("DELETE FROM book WHERE id = ?", [bookId]);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 404 route (keep this last)
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});
