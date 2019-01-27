const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/url-shortener', {useMongoClient: true});

const urlSchema = mongoose.Schema ({
    original_url: {
        type: String,
        default: "",
        index: true
    },
    short_url: {
        type: String,
        default: ""
    }
})

const Url = mongoose.connection.model('Url', urlSchema);

module.exports.Url = Url;