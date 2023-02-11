const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true }
});

module.exports = transactionSchema;