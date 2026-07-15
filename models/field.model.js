const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  id: String,
  type: String,
  label: String,
  description: String,
  placeholder: String,
  required: Boolean,
  options: mongoose.Schema.Types.Mixed // Array of strings OR Array of Objects for Offer Ladder
});

const Field = mongoose.model('Field', FieldSchema);

module.exports = Field;
