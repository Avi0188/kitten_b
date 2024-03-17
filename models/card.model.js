const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true }
});

const cardModel= mongoose.model("Card" , cardSchema)
module.exports = cardModel
