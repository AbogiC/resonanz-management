require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Routes
// GET all sheet music
app.get("/api/sheetmusic", (req, res) => {
  db.query("SELECT * FROM sheet_music", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// GET single sheet music by ID
app.get("/api/sheetmusic/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM sheet_music WHERE id = ?", [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Sheet music not found" });
      return;
    }
    res.json(results[0]);
  });
});

// POST create new sheet music
app.post("/api/sheetmusic", (req, res) => {
  const { title, composer, quantity } = req.body;
  db.query(
    "INSERT INTO sheet_music (title, composer, quantity) VALUES (?, ?, ?)",
    [title, composer, quantity],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, title, composer, quantity });
    }
  );
});

// PUT update sheet music
app.put("/api/sheetmusic/:id", (req, res) => {
  const { id } = req.params;
  const { title, composer, quantity } = req.body;
  db.query(
    "UPDATE sheet_music SET title = ?, composer = ?, quantity = ? WHERE id = ?",
    [title, composer, quantity, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Sheet music not found" });
        return;
      }
      res.json({ id, title, composer, quantity });
    }
  );
});

// DELETE sheet music
app.delete("/api/sheetmusic/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM sheet_music WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Sheet music not found" });
      return;
    }
    res.json({ message: "Sheet music deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
