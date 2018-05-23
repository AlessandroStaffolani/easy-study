
const mongoose = require("mongoose");
const cryptoPassword = require('../crypto/password');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true, max: 300, lowercase: true },
    password: { type: String, required: true },
    salt: { type: String },
    active: { type: Boolean, default: false },
    name: { type: String, max: 100, default: '' },
    surname: { type: String, max: 100, default: '' }
});

UserSchema
    .virtual('full_name')
    .get(() => {
        let full_name = '';
        if (this.name !== '' && this.surname !== '') {
            full_name = this.name + ' ' + this.surname;
        } else if (this.name !== '' && this.surname === '') {
            full_name = this.name;
        } else {
            full_name = this.email;
        }

        return full_name;
    });

/**
 * Check if candidatePassword is equal with user password
 * @param candidatePassword
 * @returns {Promise}
 */
UserSchema.methods.comparePassword = function(candidatePassword) {
    return cryptoPassword.verify_password(candidatePassword, this.salt, this.password)
};

const UserModel = mongoose.model("User", UserSchema);

/**
 * Hock that check if email exist
 */
UserSchema.pre('save', function () {

    return new Promise((resolve, reject) => {
        // only check email exist if it has been modified (or is new)
        if (!this.isModified('email')) resolve();

        let user = this;

        UserModel.find({email: user.email})
            .then(docs => {
                if (!docs.length) {
                    resolve()
                } else {
                    let err = new Error("User email already exists!");
                    err.status = 400;
                    reject(err);
                }
            })
    });
});

/**
 * Hock to generate hash and salt of the user password, only if is new
 */
UserSchema.pre('save', function(next) {

    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    cryptoPassword.hash_password(this.password)
        .then(result => {
            this.password = result.digest;
            this.salt = result.salt;
            next();
        })
        .catch(err => next(err));
});

//Export model
module.exports = UserModel;