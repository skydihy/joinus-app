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

app.get("/", (req, res) => {
  const sqlQuery = "SELECT COUNT(*) AS count FROM users";

  connection.query(sqlQuery, (err, response) => {
    if (err) throw err;
    console.log(response);
    const userCount = response[0].count;
    res.send(`We have ${userCount} users in our db`);
  });
});

app.listen(8080, () => {
  console.log("server is running on 8080");
});
