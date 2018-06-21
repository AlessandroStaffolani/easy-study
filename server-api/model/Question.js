
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    value: { type: String, required: true, max: 400 },
    important: { type: Boolean, required: true, default: false },
    result: { type: Number, default: undefined }, // possible values: {-1, 0, 1} -1 = red, 0 = orange, 1 = green
    note: { type: String },
    images: { type: Array }, /**
        array of {
                    originalName, // name of the posted image
                    fileName, // name used for store the image
                    label, // description
                    added // time stamp,
                    relativePath // relative path from storage/images folder
                 }
        */
    section: [{type: Schema.ObjectId, ref: 'Section'}]
});

//Export model
module.exports = mongoose.model('Question', QuestionSchema);