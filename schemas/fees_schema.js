const mongoose = require('mongoose');

const feesSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  amount: { type: Number, required: true },
  year: { type: Number, maxLength: 4, minLength: 4, required: true },
  classes: [
    {
      classID: { type: mongoose.Types.ObjectId, ref: 'Class', required: true },
      className: { type: String, trim: true, required: true },
      year: { type: Number, maxLength: 4, minLength: 4, required: true }
    }
  ],
  metaInfo: {
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    created: { type: Date, required: true, default: Date.now },
    lastModified: { type: Date, required: true, default: Date.now }
  }
});

module.exports = feesSchema;
