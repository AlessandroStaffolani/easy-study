
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    active: Boolean
});

UserSchema.plugin(passportLocalMongoose, {
    lastLoginField: 'last_login',
    attemptsField: 'login_attempts',
    limitAttempts: true,
    maxAttempts: 5,
    findByUsername: function(model, queryParameters) {
        // Add additional query parameter - AND condition - active: true
        queryParameters.active = true;
        return model.findOne(queryParameters);
    }
});

module.exports = mongoose.model("User",UserSchema);