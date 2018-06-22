const abstractController = require('./abstractController');
const User = require('../model/User');
const Section = require('../model/Section');
const Question = require('../model/Question');
const Image = require('../model/Image');
const customValidators = require('../validators/custom');


const multer = require('multer');
const upload = multer({
      
});

const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const RESULT_VALUES = [
    -1,
    0,
    1
];

const question_validation_array = [
    body('question')
        .exists().withMessage('No question object provided.'),
    body('question.value')
        .exists().withMessage('Question value must be specified.'),
    body('question.result')
        .custom(value => customValidators.isOneOfArray(value, RESULT_VALUES))
        .withMessage('Question result must be one of these values [-1, 0, 1].'),
    body('question.images')
        .custom(value => customValidators.isArray(value))
        .withMessage('Question images must be an array of images.'),
    body('question.section')
        .exists().withMessage('Question section must be specified')
        .isMongoId().withMessage('Question section must be a valid subject id'),
    body('question.user')
        .exists().withMessage('Question user must be specified')
        .isMongoId().withMessage('Question user must be a valid user id'),

    sanitizeBody('question.value').trim().escape(),
    sanitizeBody('question.important').trim().escape(),
    sanitizeBody('question.result').trim().toInt().escape(),
    sanitizeBody('question.note').trim().escape(),
    sanitizeBody('question.images').escape(),
    sanitizeBody('question.section').trim().escape(),
    sanitizeBody('question.user').trim().escape(),
];


/**
 * Get all questions
 * @param req
 * @param res
 * @param next
 */
exports.get_all_questions = (req, res, next) => {

    Question.find()
        .then(questions => {
            abstractController.retrun_request(req, res, next, {questions: questions})
        })
        .catch(err => next(err))
};


/**
 * Create new question
 * @type {*[]}
 */
exports.post_question = [

    question_validation_array,

    (req, res, next) => {

        let request_question = req.body.question;

        if (abstractController.body_is_valid(req, res, next, request_question)) {

            // check if section provided exist
            Section.findById(request_question.section)
                .then(section => {

                    if (section === null) {
                        let errorPayload = {
                            errors: abstractController.create_error_object('question.section', 'Question section not exist', request_question.section),
                            requestObject: request_question
                        };
                        return abstractController.return_bad_request(req, res, next, errorPayload);
                    }

                    /*TODO Add validation for images and save them (db and filesystem) */

                    let question = new Question({
                        value: request_question.value,
                        important: (request_question.important === undefined ? false : true),
                        result: request_question.result,
                        note: request_question.note,
                        section: request_question.section,
                    });

                    question.save()
                        .then(questionObject => {
                            abstractController.retrun_request(req, res, next, {question: questionObject})
                        })
                        .catch(err => next(err))

                })
                .catch(err => {
                    console.log(err)
                })

        }
    }
];

/**
 * Get a specific section
 * @param req
 * @param res
 * @param next
 */
exports.get_section = (req, res, next) => {
    Section.findById(req.params.id)
        .then(section => {
            abstractController.retrun_request(req, res, next, {section: section})
        })
        .catch(err => next(err))
};

/**
 * Update existing section
 * @type {*[]}
 */
exports.update_section = [

    question_validation_array,

    (req, res, next) => {

        let request_section = req.body.section;

        if (abstractController.body_is_valid(req, res, next, request_section)) {

            // check if subject provided exist
            let subjectPromise = Question.findById(request_section.subject)
                .then(subject => {

                    if (subject === null) {
                        let errorPayload = {
                            errors: abstractController.create_error_object('section.subject', 'Section subject not exist', request_section.subject),
                            requestObject: request_section
                        };
                        return abstractController.return_bad_request(req, res, next, errorPayload);
                    }

                    return subject;
                })
                .catch(err => next(err));

            let sectionPromise = Section.findById(req.params.id)
                .then(section => {

                    if (section) {

                        section.name = request_section.name;
                        section.subject = request_section.subject;

                        return section;
                    } else {
                        return null;
                    }

                })
                .catch(err => next(err));

            Promise.all([subjectPromise, sectionPromise])
                .then(results => {

                    let section = results[1];
                    if (section) {
                        section.save()
                            .then(sectionObject => {
                                abstractController.retrun_request(req, res, next, {section: sectionObject})
                            })
                            .catch(err => next(err))
                    }
                })
                .catch(err => next(err))
        }
    }
];

/**
 * Get all sections of a specific subject
 */
exports.get_subject_sections = (req, res, next) => {

    Section.find({ subject: req.params.id })
        .then(sections => {
            abstractController.retrun_request(req, res, next, {sections: sections})
        })
        .catch(err => next(err))

};

/**
 * Delete section
 * @param req
 * @param res
 * @param next
 */
exports.delete_section = (req, res, next) => {

    Section.findByIdAndDelete(req.params.id)
        .then(deletedSection => abstractController.retrun_request(req, res, next, { deletedSection: deletedSection }) )
        .catch(err => next(err))
};

const save_image = (image_value) => {


};