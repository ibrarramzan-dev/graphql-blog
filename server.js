const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { connectDB } = require('./db');
const app = express();

connectDB();

app.get('/', (req, res) => {
  res.json({ msg: 'Hello world!' });
});

app.listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`));