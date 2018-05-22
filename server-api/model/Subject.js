
const mongoose = require('mongoose');
const moment = require('moment');

let Schema = mongoose.Schema;

let SubjectSchema = new Schema({
    name: { type: String, required: true, max: 200 },
    date_exam: {type: Date},
    user: [{type: Schema.ObjectId, ref: 'User'}]
});

SubjectSchema
    .virtual('date_exam_formatted')
    .get(() => {
        return this.date_exam ? moment(this.date_exam).format('DD-MM-YYYY') : '';
    });

//Export model
module.exports = mongoose.model('Subject', SubjectSchema);