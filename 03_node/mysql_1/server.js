const express = require("express");
const mysql = require("mysql");

// Create a connection
const db = mysql.createConnection({
  host: "localhost",
  user: "nodemysqluser",
  password: "Ada117121",
  database: "nodemysql",
});

// Connect
db.connect((err) => {
  if (err) throw err;
  console.log("MySql connected...");
});

const app = express();

// Create DB
app.get("/create_db", (req, res) => {
  const sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created");
  });
});

// Create table
app.get("/create_post_table", (req, res) => {
  const sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post table created");
  });
});

// Insert post 1
app.get("/add_post_1", (req, res) => {
  const post = { title: "Post One", body: "This is post number one" };
  const sql = "INSERT INTO posts SET ?"; // ? is a placeholder for data
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post one added");
  });
});

// Select posts
app.get("/get_posts", (req, res) => {
  const sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts fetched");
  });
});

// Select a post
app.get("/get_post/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM posts WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("A post fetched");
  });
});

// Update a post
app.get("/update_post/:id", (req, res) => {
  const { id } = req.params;
  const new_title = "Updated title";
  const sql = `UPDATE posts SET title = '${new_title}' WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("A post updated");
  });
});

// Delete a post
app.get("/delete_post/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM posts WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("A post deleted");
  });
});

app.listen("3000", () => {
  console.log("The server is running on http://localhost:3000/");
});
