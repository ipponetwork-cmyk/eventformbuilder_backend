const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  recordId: String,
  userId: String,
  answers: mongoose.Schema.Types.Mixed, // Key-value pair of FieldID -> Value
  paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'FREE'] },
  amountPaid: Number,
  timestamp: { type: Date, default: Date.now }
});

const FormResponse = mongoose.model('FormResponse', ResponseSchema);

module.exports = FormResponse;