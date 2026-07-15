const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  id: String,
  type: String,
  label: String,
  description: String,
  placeholder: String,
  required: Boolean,
  options: mongoose.Schema.Types.Mixed
});

const FormSchema = new mongoose.Schema({
  title: String,
  description: String,
  fields: [FieldSchema],
});

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;