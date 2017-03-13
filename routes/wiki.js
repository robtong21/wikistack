'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;

router.get('/', function(req, res){
   res.redirect('/');
});

router.post('/', function(req, res){
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
        console.log(req.body)

        //Page.create() //returns promise
    let page = Page.build({   //creates  db instance of page, dosn't save
        title: title,
        content: content,
        status: status
    });
    page.save()
    .then(function(obj){
        res.json(obj)
    })
});

router.get('/add', function(req, res){
    res.render('addpage')
})




module.exports = router;
