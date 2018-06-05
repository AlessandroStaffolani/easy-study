
const mongoose = require('mongoose');
const moment = require('moment');
const SectionModel = require('./Section');

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

const SubjectModel = mongoose.model('Subject', SubjectSchema);

/**
 * Hock that check create default section
 */
SubjectSchema.pre('save', function () {

    return new Promise((resolve, reject) => {

        let subject = this;
        // only if default section not exists
        SectionModel.find({subject: subject.id})
            .then(docs => {
                if (docs.length === 0) {
                    let newSection = new SectionModel({
                        name: 'default',
                        subject: subject.id
                    });

                    newSection.save()
                        .then(section => resolve())
                        .catch(err => reject(err))
                }
            })
    });
});

//Export model
module.exports = SubjectModel