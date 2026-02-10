import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool(process.env.DATABASE_URL);

// test db
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) total FROM it_tasks");
    res.json({ ok: true, total: rows[0].total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("IT Task Backend running");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
