let mongoose = require('mongoose');

let PublisherSchema = new mongoose.Schema({

        publisher_name:String,
        location:String,
         year:Number,

        upvotes: {type: Number, default: 0}
    },
    { collection: 'publisher' });

module.exports = mongoose.model('Publisher', PublisherSchema)