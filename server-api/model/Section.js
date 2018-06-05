
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let SectionSchema = new Schema({
    name: { type: String, required: true, max: 200 },
    subject: [{type: Schema.ObjectId, ref: 'Subject'}]
});

//Export model
module.exports = mongoose.model('Section', SectionSchema);