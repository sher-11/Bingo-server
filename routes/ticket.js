var express = require("express");
var app = express();
var router = require("express").Router();
var Ticket = require("../models/ticket");

var content = "";

router.get("/:ticketID", function (req, res) {
  var ticketID = req.params.ticketID;
  Ticket.findOne(
    {
      ticketID: ticketID,
    },
    function (err, data) {
      if (data) {
        displayTicket(res, data.ticketData);
      } else {
        res.send({ Error: "Invalid Ticket ID" });
      }
    }
  );
});

function displayTicket(res, ticketData) {
  var row1 = ticketData.splice(0, 5);
  var row2 = ticketData.splice(0, 5);
  var row3 = ticketData.splice(0, 5);

  var row1Data = new Array(9);
  var row2Data = new Array(9);
  var row3Data = new Array(9);

  row1.forEach(function (n) {
    row1Data[+n.split(":")[0]] = +n.split(":")[1];
  });

  row2.forEach(function (n) {
    row2Data[+n.split(":")[0] % 10] = +n.split(":")[1];
  });

  row3.forEach(function (n) {
    row3Data[+n.split(":")[0] % 10] = +n.split(":")[1];
  });

  row1Data.shift();
  row2Data.shift();
  row3Data.shift();

  var row1IndexOne = row1Data[0] == undefined ? "" : row1Data[0];
  var row1IndexTwo = row1Data[1] == undefined ? "" : row1Data[1];
  var row1IndexThree = row1Data[2] == undefined ? "" : row1Data[2];
  var row1IndexFour = row1Data[3] == undefined ? "" : row1Data[3];
  var row1IndexFive = row1Data[4] == undefined ? "" : row1Data[4];
  var row1IndexSix = row1Data[5] == undefined ? "" : row1Data[5];
  var row1IndexSeven = row1Data[6] == undefined ? "" : row1Data[6];
  var row1IndexEight = row1Data[7] == undefined ? "" : row1Data[7];
  var row1IndexNine = row1Data[8] == undefined ? "" : row1Data[8];

  var row2IndexOne = row2Data[0] == undefined ? "" : row2Data[0];
  var row2IndexTwo = row2Data[1] == undefined ? "" : row2Data[1];
  var row2IndexThree = row2Data[2] == undefined ? "" : row2Data[2];
  var row2IndexFour = row2Data[3] == undefined ? "" : row2Data[3];
  var row2IndexFive = row2Data[4] == undefined ? "" : row2Data[4];
  var row2IndexSix = row2Data[5] == undefined ? "" : row2Data[5];
  var row2IndexSeven = row2Data[6] == undefined ? "" : row2Data[6];
  var row2IndexEight = row2Data[7] == undefined ? "" : row2Data[7];
  var row2IndexNine = row2Data[8] == undefined ? "" : row2Data[8];

  var row3IndexOne = row3Data[0] == undefined ? "" : row3Data[0];
  var row3IndexTwo = row3Data[1] == undefined ? "" : row3Data[1];
  var row3IndexThree = row3Data[2] == undefined ? "" : row3Data[2];
  var row3IndexFour = row3Data[3] == undefined ? "" : row3Data[3];
  var row3IndexFive = row3Data[4] == undefined ? "" : row3Data[4];
  var row3IndexSix = row3Data[5] == undefined ? "" : row3Data[5];
  var row3IndexSeven = row3Data[6] == undefined ? "" : row3Data[6];
  var row3IndexEight = row3Data[7] == undefined ? "" : row3Data[7];
  var row3IndexNine = row3Data[8] == undefined ? "" : row3Data[8];

  content += "<table>";
  content +=
    "<tr><td>" +
    row1IndexOne +
    "</td><td>" +
    row1IndexTwo +
    "</td><td>" +
    row1IndexThree +
    "</td><td>" +
    row1IndexFour +
    "</td><td>" +
    row1IndexFive +
    "</td><td>" +
    row1IndexSix +
    "</td><td>" +
    row1IndexSeven +
    "</td><td>" +
    row1IndexEight +
    "</td><td>" +
    row1IndexNine +
    "</td></tr>";
  content +=
    "<tr><td>" +
    row2IndexOne +
    "</td><td>" +
    row2IndexTwo +
    "</td><td>" +
    row2IndexThree +
    "</td><td>" +
    row2IndexFour +
    "</td><td>" +
    row2IndexFive +
    "</td><td>" +
    row2IndexSix +
    "</td><td>" +
    row2IndexSeven +
    "</td><td>" +
    row2IndexEight +
    "</td><td>" +
    row2IndexNine +
    "</td></tr>";
  content +=
    "<tr><td>" +
    row3IndexOne +
    "</td><td>" +
    row3IndexTwo +
    "</td><td>" +
    row3IndexThree +
    "</td><td>" +
    row3IndexFour +
    "</td><td>" +
    row3IndexFive +
    "</td><td>" +
    row3IndexSix +
    "</td><td>" +
    row3IndexSeven +
    "</td><td>" +
    row3IndexEight +
    "</td><td>" +
    row3IndexNine +
    "</td></tr>";
  content += "</table>";
  res.send(content);
  content = "";
}

module.exports = router;
