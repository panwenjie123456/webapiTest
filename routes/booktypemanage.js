let Booktype = require('../models/booktype');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');

var mongodbUri ='mongodb://panwenjie:yzby.971215@ds225703.mlab.com:25703/panwenjie';
mongoose.connect(mongodbUri);
mongoose.connect('mongodb://localhost:3000/booktype');

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

    Booktype.find(function(err, booktype) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(booktype,null,5));
    });
}



function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

router.addBooktype = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var booktype = new Booktype();
    booktype.book_name = req.body.book_name;
    booktype.type_no = req.body.type_no;
    booktype.description = req.body.description;

    booktype.save(function(err) {
        if (err)
            res.json({ message: 'Booktype NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Booktype Successfully Added!', data: booktype });
    });
}

router.findByName = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.book_name;
    var _filter = {
        $or: [
            {book_name : {$regex : keyword, $options: '$i'}}
        ]

    }

    var count = 0;
    Booktype.count(_filter,function (err,doc) {
        if(err){
            res.json({errmsg:err});
        }else{
            count =doc;
        }

    });
    Booktype.find(_filter).limit(10).exec(function (err,booktype) {
        if (err) {
            res.json({errmsg: err});
        } else {
            res.send(JSON.stringify(booktype, null, 5));
        }
    });
}


router.incrementUpvotes = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var booktype = getByValue(booktype,req.params.id);

    if (booktype != null) {
        booktype.upvotes += 1;
        res.json({status : 200, message : 'UpVote Successful' , booktype : booktype });
    }
    else
        res.send('Booktype NOT Found - UpVote NOT Successful!!');

}

router.incrementUpvotes = (req, res) => {

    Booktype.findById(req.params.id, function(err,booktype) {
        if (err)
            res.json({ message: 'Booktype NOT Found!', errmsg : err } );
        else {
            booktype.upvotes += 1;
            booktype.save(function (err) {
                if (err)
                    res.json({ message: 'Booktype NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Booktype Successfully Upvoted!', data: booktype });
            });
        }
    });
}

router.deleteBooktype = (req, res) => {

    Booktype.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Booktype NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Booktype Successfully Deleted!'});
    });
}

router.findTotalVotes = (req, res) => {

    Booktype.find(function(err, booktype) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(booktype) });
    });
}

module.exports = router;