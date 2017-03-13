'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes');
// const fs = require('fs');
const path = require('path');
const models = require('./models');

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));

var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use('/', routes)

models.User.sync({})
.then(function() {
    return models.Page.sync({})
})
.then(function() {
    app.listen(3000, function() {
    console.log("Listening...")
})
.catch(console.error);
