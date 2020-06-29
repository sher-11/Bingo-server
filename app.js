var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Game = require("./models/game");
var app = express();

mongoose.connect(
  "mongodb://root:password80@ds019836.mlab.com:19836/bingo",
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the database");
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apiRoutes = require("./api/index");
app.use("/api/game", apiRoutes);

var ticketRoutes = require("./routes/ticket");
app.use("/ticket", ticketRoutes);

app.listen(3000, function (err) {
  if (err) throw err;
  console.log("Server is Running");
});
