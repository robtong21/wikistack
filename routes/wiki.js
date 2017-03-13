'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;

router.get('/', function(req, res){
    res.redirect('/');
});

router.post('/', function(req, res, next){
    const name = req.body.name;
    const email = req.body.email;
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
        res.redirect(obj.route);
    })
    .catch(next)
});

router.get('/add', function(req, res){
    res.render('addpage')
})

router.get('/:urltitle', function(req, res, next) {
    Page.findAll({
        where: {
            urlTitle: req.params.urltitle
        }
    })
    .then(function(obj) {
        // res.send(obj);
        res.render('wikipage', {obj})
    })
    .catch(next);
})

// [{"route":"/wiki/nicks_page","id":1,"title":"nick's page","urlTitle":"nicks_page","content":"faj;slajfl;saj\r\nEnter text here...","status":"open","date":"2017-03-13T19:54:23.000Z","createdAt":"2017-03-13T19:54:23.349Z","updatedAt":"2017-03-13T19:54:23.349Z"}]



module.exports = router;
