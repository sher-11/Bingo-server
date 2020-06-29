var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
  gameID: String,
  ticketID: String,
  username: String,
  ticketData: { type: [String] },
});

module.exports = mongoose.model("Ticket", TicketSchema);
