
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: { type: String, required: true, max: 400 },
    important: { type: Boolean, required: true, default: false },
    result: { type: Number, default: undefined }, // possible values: {undefined, -1, 0, 1} -1 = red, 0 = orange, 1 = green
    subject: [{type: Schema.ObjectId, ref: 'Subject'}]
});

//Export model
module.exports = mongoose.model('Question', QuestionSchema);