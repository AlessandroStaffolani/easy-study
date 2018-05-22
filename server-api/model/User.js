
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true, max: 300, lowercase: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    name: { type: String, max: 100, default: '' },
    surnname: { type: String, max: 100, default: '' }
});

UserSchema
    .virtual('full_name')
    .get(() => {
        let full_name = '';
        if (this.name !== '' && this.surnname !== '') {
            full_name = this.name + ' ' + this.surnname;
        } else if (this.name !== '' && this.surnname === '') {
            full_name = this.name;
        } else {
            full_name = this.email;
        }

        return full_name;
    });

//Export model
module.exports = mongoose.model("User",UserSchema);