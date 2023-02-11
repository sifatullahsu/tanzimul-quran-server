const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true }
});

module.exports = classSchema;
