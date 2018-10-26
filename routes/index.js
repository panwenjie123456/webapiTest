var express = require('express');
const jwt = require("jsonwebtoken");
const config = require("../config");
var router = express.Router();

router.use(function(req, res, next) {


  next(); // make sure we go to the next routes and don't stop here
});
/*
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
       // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'book manage app' });
});

module.exports = router;







