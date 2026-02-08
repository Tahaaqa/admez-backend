const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date(), // Dynamic timestamp
  },
  status: {
    type: String,
    required: true,
  },
  mediaId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  }
});

const Sale = mongoose.model('Sale', salesSchema);
module.exports = Sale;