const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  fatherName: { type: String, trim: true, required: true },
  motherName: { type: String, trim: true, required: true },
  address: {
    present: { type: String, trim: true, required: true },
    permanent: { type: String, trim: true, required: true },
  },
  localGuardian: {
    name: { type: String, trim: true, required: true },
    relation: { type: String, trim: true, required: true },
    number: { type: String, trim: true, required: true },
    presentAddress: { type: String, trim: true, required: true },
  },
  academic: [
    {
      classID: { type: mongoose.Types.ObjectId, ref: 'Class', required: true },
      className: { type: String, trim: true, required: true },
      roll: { type: Number, required: true },
      session: { type: Number, required: true },
      isCurrent: { type: Boolean, required: true },
    }
  ],
  advanceDeposit: { type: Number, default: 0, required: true },
  metaInfo: {
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    created: { type: Date, required: true, default: Date.now },
    lastModified: { type: Date, required: true, default: Date.now }
  }
});

module.exports = studentSchema;