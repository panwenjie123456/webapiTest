let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    No:Number,
    book_name:String,
    author:String,
    publisher_name:String,
    price:Number,
    amount:Number,
    upvotes: {type: Number, default: 100}
    },
    { collection: 'book' });

module.exports = mongoose.model('Book', BookSchema);