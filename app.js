const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// TODO import routes

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// TODO use imported routes

app.listen(PORT);