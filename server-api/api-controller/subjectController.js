const abstractController = require('./abstractController');
const Subject = require('../model/Subject');
const User = require('../model/User');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/**
 * Create new subject
 * @type {*[]}
 */
exports.post_subject = [

    body('subject')
        .exists().withMessage('No subject object provided.'),
    body('subject.name')
        .exists().withMessage('Subject name must be specified.'),
    body('subject.date_exam')
        .exists().withMessage('Subject date_exam must be specified'),
    body('subject.user')
        .exists().withMessage('Subject user must be specified')
        .isMongoId().withMessage('Subject user must be a valid user id'),

    /*TODO Implement isValidDate as express custom validator */

    sanitizeBody('user.name').trim().escape(),
    sanitizeBody('user.date_exam').toDate().escape(),
    sanitizeBody('user.user').trim().escape(),

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