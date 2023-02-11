const express = require('express');
const mongoose = require('mongoose');
const { response } = require('../helpers/halpers');
const classSchema = require('../schemas/class_schema');

const router = express.Router();
const Class = new mongoose.model('Class', classSchema);


router.get('/list', async (req, res) => {
  try {
    const query = {}
    const results = await Class.find(query).select({ __v: 0 });

    res.send(response(true, results));
  }
  catch (error) {
    res.send(response(false, 'There have server side error!'));
  }
});

router.post('/insert', async (req, res) => {
  const newDocument = new Class(req.body);
  await newDocument.save((err) => {
    if (err) {
      res.json({
        status: false,
        message: 'There was a server side error!'
      });
    }
    else {
      res.json({
        status: true,
        message: 'Item created successful!'
      })
    }
  });
});



module.exports = router;