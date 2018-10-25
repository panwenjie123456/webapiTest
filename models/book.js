let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    No:Number,
    book_name:String,
    author:String,
    publisher_name:String,
    price:Number,
    amount: {type: Number, default: 50}
    },
    { collection: 'book' });

module.exports = mongoose.model('Book', BookSchema);