const mongoose = require('mongoose');

const Author = new mongoose.Schema({
    authorName: { 
        type: String, 
        required: [true, "Name must contain 3 characters!"],
        minlength: [3, "Author name must be at least 3 characters long!"]
    }

}, { timestamps: true });

module.exports = mongoose.model('Author', Author);
