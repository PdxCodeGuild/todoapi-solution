const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const itemSchema = mongoose.Schema({
  task: String,
  completed: {
    type: Boolean,
    default: false,
  },
  list: {
    type: ObjectId,
    ref: 'List'
  }
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;