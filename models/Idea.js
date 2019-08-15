const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Idea', IdeaSchema);