const mongoose = require('mongoose');

const playerSchema= new mongoose.Schema({
   currentPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isGameOver: { type: Boolean, default: false },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const gameSchema = new mongoose.Schema({
  deck: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });



const gameModel = mongoose.model('Game', gameSchema);
const playerModel = mongoose.model('Player', playerSchema);
module.exports = {gameModel, playerModel}
