const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BasketModel = mongoose.model('Basket', basketSchema);

export default BasketModel;
