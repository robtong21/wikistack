'use strict';

const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki.js');
const models = require('../models');
const Page = models.Page;

router.use('/wiki', wikiRouter) // move this to routes


router.get('/', function(req, res, next) {
     Page.findAll()
     .then(function(result) {
        res.render('index', {result})
    })
})

module.exports = router;
