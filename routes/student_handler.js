const express = require('express');
const mongoose = require('mongoose');
const { response, isID } = require('../helpers/halpers');
const studentSchemas = require('../schemas/student_schema');

const router = express.Router();
const Student = new mongoose.model('Student', studentSchemas);


// http://localhost:5000/api/v1/students/....

router.get('/list', async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const skip = (page - 1) * size;

  try {
    const query = {}
    const results = await Student.find(query).skip(skip).limit(size).sort({ _id: -1 });

    res.send(response(true, results));
  }
  catch (error) {
    res.send(response(false, 'There have server side error!'));
  }

});


router.get('/single/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const query = { _id: id }
    const results = await Student.findOne(query);

    res.send(results ? response(true, results) : response(false, 'Data not found!'));
  }
  catch (error) {
    res.send(response(false, 'There have server side error!'));
  }

});


router.post('/insert', async (req, res) => {
  const newDocument = new Student(req.body);
  await newDocument.save((err) => {
    if (err) {
      res.json({
        status: false,
        message: 'There was a server side error!'
        // message: err
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


// router.post('/insert-all', async (req, res) => {
//   await Student.insertMany(req.body, (err) => {
//     if (err) {
//       res.json({
//         status: false,
//         message: 'There was a server side error!'
//       });
//     }
//     else {
//       res.json({
//         status: true,
//         message: 'Items created successful!'
//       })
//     }
//   })
// });


router.patch('/edit/:id', async (req, res) => {

  const query = { _id: req.params.id }
  const result = await Student.updateOne(query, { $set: req.body });

  if (result?.acknowledged) {
    res.json({
      status: true,
      message: 'Items updated successful!'
    });
  }
  else {
    res.json({
      status: false,
      message: 'There was a server side error!'
    });
  }
});


router.delete('/delete/:id', async (req, res) => { });


module.exports = router;