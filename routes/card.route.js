const {Router} = require('express');
const cardRouter = Router();
const cardModel = require('../models/card.model');

// Create a new card
cardRouter.post('/cards', async (req, res) => {
  try {
    const { type, description } = req.body;
    const newCard = new cardModel({ type, description });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all cards
cardRouter.get('/cards', async (req, res) => {
  try {
    const cards = await cardModel.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single card by ID
cardRouter.get('/cards/:id', async (req, res) => {
  try {
    const card = await cardModel.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a card by ID
cardRouter.put('/cards/:id', async (req, res) => {
  try {
    const { type, description } = req.body;
    const updatedCard = await cardModel.findByIdAndUpdate(req.params.id, { type, description }, { new: true });
    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a card by ID
cardRouter.delete('/cards/:id', async (req, res) => {
  try {
    const deletedCard = await cardModel.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = cardRouter;
