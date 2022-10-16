const express = require("express");
const { createConnection } = require("mysql");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const { faker } = require("@faker-js/faker");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// setup - only development
const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "12345600",
  database: "join_us",
});

app.get("/", (req, res) => {
  const sqlQuery = "SELECT COUNT(*) AS count FROM users";

  connection.query(sqlQuery, (err, result) => {
    if (err) throw err;
    const userCount = result[0].count;
    // res.send(`We have ${userCount} users in our db`);
    res.render("home", { data: userCount });
  });
});

app.post("/register", (req, res) => {
  const person = {
    email: req.body.email,
  };

  connection.query("INSERT INTO users SET ?", person, (err, result) => {
    if (err) throw err;
    console.log(result);

    res.redirect("/");
  });
});

app.listen(8080, () => {
  console.log("server is running on 8080");
});
