var express = require("express");
var app = express();
var router = require("express").Router();
var async = require("async");

var Game = require("../models/game");
var Ticket = require("../models/ticket");

var selectedNumbers = [];
var count = 0;
var Start = new Array(0, 1, 10, 20, 30, 40, 50, 60, 70, 80);
var End = new Array(0, 9, 19, 29, 39, 49, 59, 69, 79, 90);
var ticketIndex = [];
var numberOnTicket = 0;
var indexMapper = [];
var totalTickets = 0;
var ticketData,
  content = "",
  numberStats;

router.post("/create", function (req, res, next) {
  var game = new Game();
  var newGameId = Math.random().toString(36).substr(2, 9);
  game.gameId = newGameId;
  game.save(function (err) {
    if (err) return next(err);
    res.json({
      "Game ID": newGameId,
    });
  });
});

router.post("/:gameID/ticket/:userName/generate", function (req, res, next) {
  var gameID = req.param("gameID");
  var username = req.param("userName");
  async.waterfall([
    function (callback) {
      Game.findOne(
        {
          gameId: gameID,
        },
        function (err, game) {
          if (game) {
            callback(null, game);
          } else {
            res.json({
              Error: "Invalid Game ID",
            });
          }
        }
      );
    },

    function (game, callback) {
      ticketData = main();
      var ticketID = Math.random().toString(36).substr(2, 9);

      var ticket = new Ticket();
      ticket.gameID = game.gameId;
      ticket.username = username;
      ticket.ticketID = ticketID;
      ticket.ticketData = ticketData;
      ticket.save(function (err) {
        if (err) return next(err);
        res.json({
          "Ticket ID Generated": ticketID,
        });
      });
    },
  ]);
});

router.get("/:gameID/number/random", function (req, res, next) {
  var gameId = req.params.gameID;
  Game.findOne(
    {
      gameId: gameId,
    },
    function (err, data) {
      if (data) {
        random = generateNextRandom().toString();
        Game.updateOne(
          {
            gameId: gameId,
          },
          {
            numbersDrawn: selectedNumbers,
          },
          function (err, response) {
            if (err) return next(err);
            res.json({
              "Number Drawn is ": random,
            });
          }
        );
      } else {
        res.status(404).json("Game ID not found");
      }
    }
  );
});

router.get("/:gameId/numbers", function (req, res) {
  var gameId = req.params.gameId;
  Game.findOne(
    {
      gameId: gameId,
    },
    function (err, data) {
      if (data) {
        if (data.numbersDrawn.length == 0) {
          res.json({
            Error: "Game has not started yet",
          });
        } else {
          res.json({
            "Numbers Drawn are": data.numbersDrawn,
          });
        }
      } else {
        res.json({
          Error: "Invalid Game ID",
        });
      }
    }
  );
});

router.get("/:gameId/stats", function (req, res) {
  var gameId = req.params.gameId;
  Game.findOne(
    {
      gameId: gameId,
    },
    function (err, response) {
      if (response) {
        Ticket.find(
          {
            gameID: gameId,
          },
          function (err, data) {
            if (data) {
              totalTickets = data.length;
              numberStats =
                response.numbersDrawn.length == 0 ? 0 : response.numbersDrawn;
              res.json({
                "Numbers Drawn": numberStats,
                "Total Number of Users": totalTickets,
                "Total Number of Tickets": totalTickets,
              });
            }
          }
        );
      } else {
        res.json({
          Error: "Invalid Game ID",
        });
      }
    }
  );
});

function generateRandom() {
  var min = 1;
  var max = 90;
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

function generateNextRandom() {
  if (selectedNumbers.length > 89) {
    res.json({
      Message: "Game has Ended",
    });
    return 0;
  }
  var randomNumber = generateRandom();
  if (selectedNumbers.indexOf(randomNumber) > -1) {
    randomNumber = generateRandom();
  }
  selectedNumbers.push(randomNumber);
  return randomNumber;
}

function main() {
  ticketIndex = getIndex();
  ticketIndex.sort(function (a, b) {
    return a - b;
  });
  ticketIndex.forEach(function (n) {
    var num = getRandomNum(n);
    indexMapper.push(n + ":" + num);
    if (removeRepeatElement(num, indexMapper) == false) {
      while (removeRepeatElement(num, indexMapper) == false) {
        num = getRandomNum(n);
      }
    }
    fetchGroupedNumbers(indexMapper, n, num);
  });
  return indexMapper;
}

function getIndex() {
  while (ticketIndex.length < 15) {
    var flag = false;
    var randomNumber = Math.ceil(Math.random() * 9);
    if (count >= 5 && count < 10) {
      randomNumber = randomNumber + 10;
    } else if (count >= 10) {
      randomNumber = randomNumber + 20;
    }
    for (var i = 0; i < ticketIndex.length; i++) {
      if (ticketIndex[i] == randomNumber) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      ticketIndex[ticketIndex.length] = randomNumber;
      count++;
    }
  }
  return ticketIndex;
}

function getRandomNum(number) {
  var start = 0,
    num;
  var upperLimit, lowerLimit;
  if (number > 10) {
    num = +String(number).charAt(1);
  } else {
    num = number;
  }
  upperLimit = Start[num];
  lowerLimit = End[num];
  numberOnTicket =
    Math.floor(Math.random() * (lowerLimit - upperLimit + 1)) + upperLimit;
  return numberOnTicket;
}

function fetchGroupedNumbers(indexMapper, n, num) {
  var indexMapperKey;
  var indexMapperValue;
  var temp = [];

  var res = 0;
  var arySort = [];
  var flag = false;
  temp[temp.length] = num;
  for (var i = 0; i < indexMapper.length; i++) {
    indexMapperValue = indexMapper[i].split(":")[1];
    if (
      n + 10 == indexMapperKey ||
      n - 10 == indexMapperKey ||
      n + 20 == indexMapperKey ||
      n - 20 == indexMapperKey
    ) {
      temp[temp.length] = indexMapperValue;
      flag = true;
    }
  }
  if (flag) {
    temp.sort(function (a, b) {
      return a - b;
    });
    sortTicketIndex(indexMapper, indexMapperKey, temp);
  }
}

function sortTicketIndex(indexMapper, indexMapperKey, temp) {
  var str;
  var c = 0;
  var extractedKey;
  for (var i = 0; i < indexMapper.length; i++) {
    extractedKey = indexMapper[i].split(":")[0];
    if (
      indexMapperKey == extractedKey ||
      indexMapperKey + 10 == extractedKey ||
      indexMapperKey - 10 == extractedKey ||
      indexMapperKey + 20 == extractedKey ||
      indexMapperKey - 20 == extractedKey
    ) {
      str = extractedKey + ":" + temp[c];
      indexMapper[i] = str;
      c++;
    }
  }
}

function removeRepeatElement(num, indexMapper) {
  var extractedNumber;
  var flag = false;
  for (var i = 0; i < indexMapper.length; i++) {
    extractedNumber = indexMapper[i].split(":")[1];
    if (extractedNumber == num) {
      flag = true;
      return false;
      break;
    }
  }
  if (!flag) {
    return true;
  }
}

module.exports = router;
