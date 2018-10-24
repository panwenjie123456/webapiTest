let Publisher = require('../models/publisher');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');

var mongodbUri ='mongodb://panwenjie:yzby.971215@ds225703.mlab.com:25703/panwenjie';
mongoose.connect(mongodbUri);
mongoose.connect('mongodb://localhost:3000/publisher');

let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});


router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Publisher.find(function(err, publisher) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(publisher,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Publisher.find({ "_id" : req.params.id },function(err, publisher) {
        if (err)
            res.json({ message: 'Publisher NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(publisher,null,5));
    });
}

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

router.addPublisher = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var publisher = new Publisher();
    publisher.publisher_name = req.body.publisher_name;
    publisher.location = req.body.location;
    publisher.year = req.body.year;

    publisher.save(function(err) {
        if (err)
            res.json({ message: 'Publisher NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Publisher Successfully Added!', data: publisher });
    });
}

router.incrementUpvotes = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var publisher = getByValue(publisher,req.params.id);

    if (publisher != null) {
        publisher.upvotes += 1;
        res.json({status : 200, message : 'UpVote Successful' , publisher : publisher });
    }
    else
        res.send('Publisher NOT Found - UpVote NOT Successful!!');

}

router.incrementUpvotes = (req, res) => {

    Publisher.findById(req.params.id, function(err,publisher) {
        if (err)
            res.json({ message: 'Publisher NOT Found!', errmsg : err } );
        else {
            publisher.upvotes += 1;
            publisher.save(function (err) {
                if (err)
                    res.json({ message: 'Publisher NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Publisher Successfully Upvoted!', data: publisher });
            });
        }
    });
}

router.deletePublisher = (req, res) => {

    Publisher.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Publisher NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Publisher Successfully Deleted!'});
    });
}

router.findTotalVotes = (req, res) => {

    Publisher.find(function(err, publisher) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(publisher) });
    });
}

module.exports = router;