const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  name: String,
}, {
  timestamps: true,
  toJSON: {
    virtuals: true 
  }
});

listSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'list',
  justOne: false,
});

const List = mongoose.model('List', listSchema);

module.exports = List;