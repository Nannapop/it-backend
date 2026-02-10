import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("✅ Connected to Railway MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("IT Tasks API is running");
});

app.get("/it-tasks", (req, res) => {
  db.query("SELECT * FROM it_tasks", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
