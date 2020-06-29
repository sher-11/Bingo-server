var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  gameId: { type: String, unique: true, lowercase: true },
  numbersDrawn: { type: [Number] },
});

module.exports = mongoose.model("Game", GameSchema);
