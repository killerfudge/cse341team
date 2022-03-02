require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');


// TODO import routes

const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// TODO use imported routes

mongoose.connect(MONGODB_URL)
.then( result => {
  app.listen(PORT);

})
.catch( err => {
  console.log(err);
})