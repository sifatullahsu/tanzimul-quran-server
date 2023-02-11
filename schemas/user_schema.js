const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  uid: { type: String, trim: true, required: true, unique: true },
  email: { type: String, trim: true, required: true, unique: true },
});

module.exports = userSchema;