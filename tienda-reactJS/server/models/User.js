const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    chrEmail: {
        type: String,
        required: true,
        unique: true
    },
    chrFullName: {
        type: String,
        required: true
    },
    chrPassword: {
        type: String,
        required: true
    },
    intActive: {
        type: Number,
        required: true,
        default: 1
    }
})
module.exports = mongoose.model('users', UserSchema);
