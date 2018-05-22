const abstractController = require('./abstractController');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const User = require('../model/User');

exports.post_user = [

    body('email')
        .exists().withMessage('Email must be specified.')
        .isEmail().withMessage('Must be an email')
        .normalizeEmail(),
    body('password', 'passwords must be at least 5 chars long and contain one number')
        .exists()
        .isLength({ min: 5 })
        .matches(/\d/),

    sanitizeBody('email').trim().normalizeEmail().escape(),
    sanitizeBody('password').trim().escape(),
    sanitizeBody('name').trim().escape(),
    sanitizeBody('surname').trim().escape(),

    (req, res, next) => {

        const errors = validationResult(req);
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            active: false,
            name: req.body.name,
            surname: req.body.surname
        });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            let errorPayload = {
                errors: errors.mapped(),
                requestObject: user
            };
            abstractController.return_bad_request(req, res, next, 'Malformed data, please read documentation', errorPayload);
        }

    }

];