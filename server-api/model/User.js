
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

const UserModel = mongoose.model("User", UserSchema);

/**
 * Hock per verificare se l'email inserita è già presente nel database oppure no
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
 * Hock da eseguire durante il salvataggio di un oggetto User, che calcola il salt e l'hash della password
 * se stiamo inserendo un nuovo utente o se è stata modificata la password
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


/**
 * Metodo per verificare se la password salvata e quella inviata corrispondono, restituisce una promise
 * @param candidatePassword
 * @returns {Promise}
 */
UserSchema.methods.comparePassword = (candidatePassword) => {
    return cryptoPassword.verify_password(candidatePassword, this.salt, this.password)
};

//Export model
module.exports = UserModel;