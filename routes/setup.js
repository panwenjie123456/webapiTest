var express = require('express');
var router = express.Router();
var User = require('../models/user')


router.get('/', function(req, res, next) {
    var nick = new User({
        name: 'test',
        password: 'password',
        admin: true
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

module.exports = router;