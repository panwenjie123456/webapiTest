let Book = require('../models/book');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');

//
var User = require('../models/user')
var jwt    = require('jsonwebtoken');
var config = require('../config');
// route to authenticate a user (POST http://localhost:3000/api/authenticate)

var mongodbUri ='mongodb://panwenjie:yzby.971215@ds225703.mlab.com:25703/panwenjie';
mongoose.connect(mongodbUri);
mongoose.connect('mongodb://localhost:3000/book');

let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ] on mlab.com');
});

router.returntoken=(req, res) => {

    // find the user
    User.findOne(function(err, user) {
        //  name: req.body.name

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 1440 // expires in 1440 seconds
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
};



router.findAll = (req, res) => {
    // Return a JSON representation of our list
    Book.find(function(err, books) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(books,null,5));
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
    Book.count(_filter,function (err,doc) {
        if(err){
            res.send({message: 'Book NOT founded!'});
        }else{
            count =doc;
        }

    });
    Book.find(_filter).limit(10).exec(function (err,books) {
        if (err) {
            res.send({message: 'Book NOT founded!'});
        } else {
            res.send(JSON.stringify(books, null, 5));
        }
    });
}




router.addBook = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var book = new Book();
    book.No = req.body.No;
    book.book_name = req.body.book_name;
    book.author = req.body.author;
    book.publisher_name = req.body.publisher_name;
    book.price = req.body.price;
    book.amount = req.body.amount;
    book.save(function(err) {
        if (err)
            res.json({ message: 'Book NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Book Successfully Added!', data: book });
    });
}

router.findDetail = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Book.aggregate([{

        $lookup:{
            from:"publisher",
            localField: "publisher_name",
            foreignField:"publisher_name",
            as:"publisher_details"
        }
    },

        {
            $lookup:{
        from:"booktype",
            localField: "book_name",
            foreignField:"book_name",
            as:"booktype_details"
    }

        }],function (err,book) {

        if (err) {
            res.send({message: 'Book NOT founded!'});
        } else {
            res.send(JSON.stringify(book, null, 5));
        }
    });
}

router.incrementamount = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var book = getByValue(books,req.params.id);

    if (book != null) {
        book.amount += 1;
        res.json({status : 200, message : 'update amount Successful' , book : book });
    }
    else
        res.send('Book NOT Found - amount updated NOT Successful!!');

}

router.incrementamount = (req, res) => {

    Book.findById(req.params.id, function(err,book) {
        if (err)
            res.json({ message: 'Book NOT Found!', errmsg : err } );
        else {
            book.amount += 1;
            book.save(function (err) {
                if (err)
                    res.json({ message: 'Book amount NOT updated!', errmsg : err } );
                else
                    res.json({ message: 'Book Successfully updated!', data: book });
            });
        }
    });
}

router.update = (req, res) => {

    Book.findById(req.params.id, function(err,book) {
        if (err)
            res.send(err);
        book.No = req.body.No;
        book.book_name = req.body.book_name;
        book.author = req.body.author;
        book.publisher_name = req.body.publisher_name;
        book.price = req.body.price;
        book.amount = req.body.amount;
        book.save(function(err){
            if(err)
                res.send(err);
            res.json({message:'book updated!'});
        })
    });
}

router.deleteBook = (req, res) => {

    Book.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Book NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Book Successfully Deleted!'});
    });
}

router.deleteAll = (req, res) => {

    Book.remove({}, function(err) {
        if (err)
            res.json({ message: 'Book NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Book Successfully Deleted!'});
    });
}
function getTotalamounts(array) {
    let totalamounts = 0;
    array.forEach(function(obj) { totalamounts += obj.amount; });
    return totalamounts;
}

router.findTotalamounts = (req, res) => {

    Book.find(function(err, books) {
        if (err)
            res.send(err);
        else
            res.json({ totalamounts : getTotalamounts(books) });
    });
}



module.exports = router;