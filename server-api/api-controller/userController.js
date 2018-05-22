const abstractController = require('./abstractController');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

const User = require('../model/User');

exports.get_user = (req, res, next) => {

    User.findById(req.params.id)
        .then(user => {
            abstractController.retrun_request(req, res, next, { user: user })
        })
        .catch(err => next(err))
};

exports.post_user = [

    body('user')
        .exists().withMessage('No user object provided.'),
    body('user.email')
        .exists().withMessage('Email must be specified.')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
    body('user.password', 'passwords must be at least 5 chars long and contain one number')
        .exists().withMessage('Password must be specified')
        .isLength({min: 5}).withMessage('passwords must be at least 5 chars long and contain one number')
        .matches(/\d/).withMessage('passwords must be at least 5 chars long and contain one number'),

    sanitizeBody('user.email').trim().normalizeEmail().escape(),
    sanitizeBody('user.password').trim().escape(),
    sanitizeBody('user.name').trim().escape(),
    sanitizeBody('user.surname').trim().escape(),

    (req, res, next) => {

        const errors = validationResult(req);
        let requested_user = req.body.user;

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            let errorPayload = {
                errors: abstractController.reformat_errors(errors.mapped()),
                requestObject: requested_user
            };
            abstractController.return_bad_request(req, res, next, errorPayload);
        } else {
            // Data are correct, can save the object
            const user = new User({
                email: req.body.user.email,
                password: req.body.user.password,
                active: true, /*TODO in futuro gestire gli attivi e i non attivi */
                name: req.body.user.name,
                surname: req.body.user.surname
            });

            save_user(req, res, next, user, requested_user);
        }

    }

];

exports.update_user = [

    body('user')
        .exists().withMessage('No user object provided.'),
    body('user.email')
        .exists().withMessage('Email must be specified.')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),

    sanitizeBody('user.email').trim().normalizeEmail().escape(),
    sanitizeBody('user.name').trim().escape(),
    sanitizeBody('user.surname').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        let requested_user = req.body.user;

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            let errorPayload = {
                errors: abstractController.reformat_errors(errors.mapped()),
                requestObject: requested_user
            };
            abstractController.return_bad_request(req, res, next, errorPayload);
        } else {
            // Data are correct, can save the object
            User.findById(req.params.id)
                .then(user => {

                    user.email = req.body.user.email;
                    let new_name = req.body.user.name;
                    if (new_name !== undefined) {
                        user.name = new_name
                    }
                    let new_surname = req.body.user.surname;
                    if (new_surname !== undefined) {
                        user.surname = new_surname
                    }

                    save_user(req, res, next, user, requested_user);

                })
                .catch(err => next(err));
        }
    }
];


const save_user = (req, res, next, user, requested_user) => {
    user.save()
        .then(userObject => {
            abstractController.retrun_request(req, res, next, {user: userObject})
        })
        .catch(err => {
            if (err.status === 400) {
                let errorPayload = {
                    errors: {
                        "user.email": {
                            param: "user.email",
                            value: requested_user.email,
                            message: err.message
                        }},
                    requestObject: requested_user
                };
                abstractController.return_bad_request(req, res, next, errorPayload);
            } else {
                next(err);
            }
        })
};