const express = require("express");
const router = express.Router();
const pool = require("./query.js");

// 1. Menampilkan data seluruh list film
router.get("/film", (req, res) => {
  pool.query("select * from film", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

// 2. Menampilkan data film tertentu berdasarkan id
router.get("/film/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM film WHERE film_id = $1", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Query gagal" });
    } else {
      res.json(result.rows[0]);
    }
  });
});

// 3. Menampilkan data list category
router.get("/category", (req, res) => {
  pool.query("select * from category", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

// 4. Menampilkan data list film berdasarkan category
router.get("/film/category/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT film.* FROM film INNER JOIN category ON film.category_id = category.category_id WHERE category.name = $1;",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Query gagal" });
      } else {
        res.json(result.rows);
      }
    }
  );
});

pool.connect((err, res) => {
  if (err) {
    console.log("db not connected");
  } else {
    console.log("db connected");
  }
});

module.exports = router;
