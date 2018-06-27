const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    chrName: {
        type: String,
        required: true,
        unique: true
    },
    chrFile: {
        type: String,
        required: true
    },
    numPrice: {
        type: Number,
        min: 0,
        required: true
    },
    intQuantity: {
        type: Number,
        min: 0,
        required: true
    },
    intActive: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('products', ProductSchema);
