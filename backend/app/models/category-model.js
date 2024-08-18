const mongoose = require('mongoose');
const { Schema, model } = mongoose
const categoryScheme = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Category = model('Category', categoryScheme)

module.exports = Category;