const abstractController = require('./abstractController');
const Subject = require('../model/Subject');
const User = require('../model/User');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const customValidators = require('../validators/custom');

const subject_validation_array = [
    body('subject')
        .exists().withMessage('No subject object provided.'),
    body('subject.name')
        .exists().withMessage('Subject name must be specified.'),
    body('subject.date_exam')
        .exists().withMessage('Subject date_exam must be specified')
        .custom(value => customValidators.isValidDate(value)).withMessage('Subject date_exam format is not allowed, yyyy-mm-dd'),
    body('subject.user')
        .exists().withMessage('Subject user must be specified')
        .isMongoId().withMessage('Subject user must be a valid user id'),

    sanitizeBody('user.name').trim().escape(),
    sanitizeBody('user.date_exam').toDate().escape(),
    sanitizeBody('user.user').trim().escape()
];

/**
 * Get all subjects
 * @param req
 * @param res
 * @param next
 */
exports.get_all_subjects = (req, res, next) => {

    Subject.find()
        .then(subjects => {
            abstractController.retrun_request(req, res, next, {subjects: subjects})
        })
        .catch(err => next(err))
};

/**
 * Create new subject
 * @type {*[]}
 */
exports.post_subject = [

    subject_validation_array,

    (req, res, next) => {

        let request_subject = req.body.subject;

        if (abstractController.body_is_valid(req, res, next, request_subject)) {

            // check if user provided exist
            User.findById(request_subject.user)
                .then(user => {

                    if (user === null) {
                        let errorPayload = {
                            errors: abstractController.create_error_object('subject.user', 'Subject user not exist', request_subject.user),
                            requestObject: request_subject
                        };
                        return abstractController.return_bad_request(req, res, next, errorPayload);
                    }

                    let subject = new Subject({
                        name: request_subject.name,
                        date_exam: request_subject.date_exam,
                        user: request_subject.user
                    });

                    subject.save()
                        .then(subjectObject => {
                            abstractController.retrun_request(req, res, next, {subject: subjectObject})
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
 * Get all subjects of a specific user
 */
exports.get_user_subjects = (req, res, next) => {

    Subject.find({ user: req.params.id })
        .then(subjects => {
            abstractController.retrun_request(req, res, next, {subjects: subjects})
        })
        .catch(err => next(err))

};

/**
 * Get a specific subject
 * @param req
 * @param res
 * @param next
 */
exports.get_subject = (req, res, next) => {
    Subject.findById(req.params.id)
        .then(subject => {
            abstractController.retrun_request(req, res, next, {subject: subject})
        })
        .catch(err => next(err))
};

/**
 * Update existing subject
 * @type {*[]}
 */
exports.update_subject = [

    subject_validation_array,

    (req, res, next) => {

        let request_subject = req.body.subject;

        if (abstractController.body_is_valid(req, res, next, request_subject)) {

            // check if user provided exist
            let userPromise = User.findById(request_subject.user)
                .then(user => {

                    if (user === null) {
                        let errorPayload = {
                            errors: abstractController.create_error_object('subject.user', 'Subject user not exist', request_subject.user),
                            requestObject: request_subject
                        };
                        return abstractController.return_bad_request(req, res, next, errorPayload);
                    }

                    return user;

                })
                .catch(err => {
                    console.log(err)
                });

            let subjectPromise = Subject.findById(req.params.id)
                .then(subject => {

                    if (subject) {

                        subject.name = request_subject.name;
                        subject.date_exam = request_subject.date_exam;
                        subject.user = request_subject.user;

                        return subject;
                    } else {
                        return null;
                    }

                })
                .catch(err => next(err));

            Promise.all([userPromise, subjectPromise])
                .then(results => {

                    let subject = results[1];
                    if (subject) {
                        subject.save()
                            .then(subjectObject => {
                                abstractController.retrun_request(req, res, next, {subject: subjectObject})
                            })
                            .catch(err => next(err))
                    }
                })
                .catch(err => next(err))
        }
    }
];

/**
 * Delete subject
 * @param req
 * @param res
 * @param next
 */
exports.delete_subject = (req, res, next) => {

    Subject.findByIdAndDelete(req.params.id)
        .then(deletedSubject => abstractController.retrun_request(req, res, next, { deletedSubject: deletedSubject }) )
        .catch(err => next(err))
};