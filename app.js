const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send('reached the homepage')
  console.log("someone requested us");
});

app.listen(8080, () => {
  console.log("server is running on 8080");
});
