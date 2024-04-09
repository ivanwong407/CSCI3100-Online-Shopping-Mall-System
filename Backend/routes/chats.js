const express = require('express');
const router = express.Router();
const Chat = require('../models/chat.model');

// GET all chats
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find({});
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a chat by ID
router.get('/:id', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new chat
router.post('/', async (req, res) => {
  const chatData = new Chat({
    //... initialize with data from req.body
  });

  try {
    const newChat = await chatData.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a chat by ID
router.patch('/:id', async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a chat by ID
router.delete('/:id', async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;