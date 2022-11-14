require("dotenv").config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
});
const express = require("express");
const { createConnection } = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
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

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
