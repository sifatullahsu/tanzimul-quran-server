const express = require('express');
const mongoose = require('mongoose');
const { response } = require('../helpers/halpers');
const feeSchema = require('../schemas/fees_schema');

const router = express.Router();
const Fee = new mongoose.model('Fee', feeSchema);


router.get('/list', async (req, res) => {
  try {
    const query = {}
    const results = await Fee.find(query).select({ __v: 0, metaInfo: 0 });

    res.send(response(true, results));
  }
  catch (error) {
    res.send(response(false, 'There have server side error!'));
  }
});

router.post('/insert', async (req, res) => {
  const newDocument = new Fee(req.body);
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