const express = require("express");
const { createConnection } = require("mysql");
const app = express();

// setup - only development
const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "12345600",
  database: "join_us",
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const sqlQuery = "SELECT COUNT(*) AS count FROM users";

  connection.query(sqlQuery, (err, response) => {
    if (err) throw err;
    const userCount = response[0].count;
    // res.send(`We have ${userCount} users in our db`);
    res.render("home", { data: userCount });
  });
});

app.listen(8080, () => {
  console.log("server is running on 8080");
});
