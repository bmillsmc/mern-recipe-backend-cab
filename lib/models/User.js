mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true,
    },
    saved: [String],
    preferences: [String]
})

module.exports = mongoose.model('Users', UserSchema);