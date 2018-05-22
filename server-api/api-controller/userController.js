const abstractController = require('./abstractController');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const User = require('../model/User');

exports.post_user = [

    body('user')
        .exists().withMessage('No user object provided.'),
    body('user.email')
        .exists().withMessage('Email must be specified.')
        .isEmail().withMessage('Must be an email')
        .normalizeEmail(),
    body('user.password', 'passwords must be at least 5 chars long and contain one number')
        .exists()
        .isLength({ min: 5 })
        .matches(/\d/),

    sanitizeBody('user.email').trim().normalizeEmail().escape(),
    sanitizeBody('user.password').trim().escape(),
    sanitizeBody('user.name').trim().escape(),
    sanitizeBody('user.surname').trim().escape(),

    (req, res, next) => {

        const errors = validationResult(req);
        let user_requested = req.body.user;

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            let errorPayload = {
                errors: errors.mapped(),
                requestObject: user_requested
            };
            abstractController.return_bad_request(req, res, next, 'Malformed data, please read documentation', errorPayload);
        } else {
            // Data are correct, can save the object
            const user = new User({
                email: req.body.user.email,
                password: req.body.user.password, /*TODO criptare in maniera decente la password */
                active: true,           /*TODO in futuro gestire gli attivi e i non attivi */
                name: req.body.user.name,
                surname: req.body.user.surname
            });

            user.save()
                .then(userObject => {
                    abstractController.retrun_request(req, res, next, { user: userObject })
                })
                .catch(err => next(err))
        }

    }

];