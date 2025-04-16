const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  reason: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['spent', 'earned', 'investment'], required: true },
  platform: { type: String },
  category: { type: String },
  comments: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
