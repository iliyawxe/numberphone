const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// اتصال به دیتابیس (اگه نبود می‌سازه)
const db = new sqlite3.Database("./phonebook.db", (err) => {
  if (err) {
    console.error("خطا در اتصال به دیتابیس", err.message);
  } else {
    console.log("اتصال موفق به دیتابیس SQLite ✅");
  }
});

// ایجاد جدول اگه وجود نداشت
db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    phone TEXT
)`);

// دریافت همه مخاطبین
app.get("/contacts", (req, res) => {
  db.all("SELECT * FROM contacts", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// افزودن مخاطب
app.post("/contacts", (req, res) => {
  const { firstname, lastname, phone } = req.body;
  db.run(
    `INSERT INTO contacts (firstname, lastname, phone) VALUES (?, ?, ?)`,
    [firstname, lastname, phone],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, firstname, lastname, phone });
      }
    }
  );
});

// سرور روشن
app.listen(PORT, () => {
  console.log(`🚀 سرور روی http://localhost:${PORT} اجرا شد`);
});
