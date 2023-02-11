const express = require('express');
const mongoose = require('mongoose');
const { response } = require('../helpers/halpers');
const transactionSchema = require('../schemas/transaction_schema');

const router = express.Router();
const Transaction = new mongoose.model('Transaction', transactionSchema)

router.get('/list', async (req, res) => {
  try {
    const query = {}
    const results = await Transaction.find(query).select({ __v: 0 });

    res.send(response(true, results));
  }
  catch (error) {
    res.send(response(false, 'There have server side error!'));
  }
});



module.exports = router;