
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    value: { type: String, required: true, max: 400 },
    important: { type: Boolean, required: true, default: false },
    result: { type: Number, default: undefined }, // possible values: {-1, 0, 1} -1 = red, 0 = orange, 1 = green
    note: { type: String },
    images: { type: Array }, // array of Image object id
    section: [{type: Schema.ObjectId, ref: 'Section'}],
    user: [{type: Schema.ObjectId, ref: 'User'}]
});

//Export model
module.exports = mongoose.model('Question', QuestionSchema);