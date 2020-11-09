var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    subject:{
        type:String
    },
    catalog_nbr:{
        type:String
    },
    Optional:{
        type:String
    },
    start_time:{
        type:String
    },
        end_time:{
        type:String
    },
    Days:{
        type:String
    },
});

module.exports =  mongoose.model('books',bookSchema);
