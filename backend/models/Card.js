const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
    name: String,
    date: String,
    text: String
});

module.exports = model('Card', cardSchema);