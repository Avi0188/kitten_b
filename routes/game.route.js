const {Router} = require('express');
const {gameModel} = require('../models/game.model');
const cardModel = require('../models/card.model');

const auth = require('../middleware/auth.middleware');
const gameRouter=Router()


// Create a New Game

gameRouter.post('/games', auth, async (req, res) => {
  try {
    // Extract the user ID from the request
    const userId = req.userId;

    // Fetch all card IDs from the card model collection
    const allCards = await cardModel.find({}, '_id');

    // Extract card IDs from the fetched cards
    const cardIds = allCards.map(card => card._id);

    // Create a new game instance with the user ID and deck of card IDs
    const newGame = new gameModel({ deck: cardIds, user: userId });

    // Save the new game to the database
    await newGame.save();

    // Send a JSON response with the newly created game
    res.status(201).json(newGame);
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    res.status(500).json({ message: error.message });
  }
});



// Get All Games
gameRouter.get('/games',auth, async (req, res) => {
  try {
   
    const userId = req.userId;
    // console.log('User ID:', userId); 

  
    const games = await gameModel.find({ user: userId });
    // console.log('Games:', games); 
    if (!games || games.length === 0) {
      return res.status(404).json({ message: 'No games found for the user' });
    }

    for (const game of games) {
      if (game.deck && game.deck.length > 1) {
        shuffleArray(game.deck);
      }
    }


    await gameModel.populate(games, { path: 'deck' });

    // Send a JSON response with the games and their shuffled decks
    res.status(200).json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Get Game by ID
gameRouter.get('/games/:id', async (req, res) => {
  try {
    const game = await gameModel.findById(req.params.id).populate('deck');
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})




module.exports = gameRouter;
