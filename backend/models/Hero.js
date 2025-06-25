const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Hero', heroSchema); 