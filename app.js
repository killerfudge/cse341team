require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');


// TODO import routes
const budgetRoutes = require('./routes/budget');
const userRoutes = require('./routes/auth');

const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// TODO use imported routes
app.use(budgetRoutes);
app.use(userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const errors = error.errors;
  res.status(status).json({ message: message, errors: errors });
});

mongoose.connect(MONGODB_URL)
.then( result => {
  app.listen(PORT);

})
.catch( err => {
  console.log(err);
})
