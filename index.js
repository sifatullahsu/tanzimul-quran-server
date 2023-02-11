const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const classHandler = require('./routes/class_handler');
const studentHandler = require('./routes/student_handler');
const feeHandler = require('./routes/fee_handler');
const transactionHandler = require('./routes/transaction_handler');
const userHandler = require('./routes/user_handler');


require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(cors());


const connection = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect('mongodb://localhost:27017/tanzimul')
    .then(() => console.log('database connection successful'))
    .catch((err) => console.log(err));
}
connection();


app.use('/api/v1/classes', classHandler);
app.use('/api/v1/students', studentHandler);
app.use('/api/v1/fees', feeHandler);
app.use('/api/v1/transactions', transactionHandler);
app.use('/api/v1/users', userHandler);



app.get('/', (req, res) => res.send({ message: 'The server is running.' }));
app.listen(port, () => console.log(`The server running on ${port}`));