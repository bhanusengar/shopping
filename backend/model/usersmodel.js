var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    user_type: {
        type: String,
        required: true,
    }
});
usersSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.hash(user.password, 12, function (err, hash) {
            if (err) {
                next(err);
            } else {
                user.password = hash;
                next();
            }
        })
    } else {
        next();
    }
});

usersSchema.methods.comparePassword = function (npassword) {
    // return new Promise((resolve, reject) => {
    return bcrypt.compareSync(npassword, this.password)
    // })
};
usersSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
module.exports = mongoose.model('Users', usersSchema);
