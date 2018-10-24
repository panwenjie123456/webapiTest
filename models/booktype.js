let mongoose = require('mongoose');

let BooktypeSchema = new mongoose.Schema({

        book_name:String,
        type_no:Number,
        description:String,


        upvotes: {type: Number, default: 0}
    },
    { collection: 'booktype' });

module.exports = mongoose.model('Booktype', BooktypeSchema)