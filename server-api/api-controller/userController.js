const abstractController = require('./abstractController');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

const User = require('../model/User');

/**
 * Find all users
 */
exports.get_all_user = (req, res, next) => {

    all_users(req, res, next);
};

/**
 * Find all active or not active users
 */
exports.get_all_user_active = (req, res, next) => {
    let active = req.params.active;
    active = active == 1 ? true : false;
    all_users(req, res, next, active);
};

/**
 * Find user by id, no password and salt
 */
exports.get_user = (req, res, next) => {

    User.findById(req.params.id, '-password -salt')
        .then(user => abstractController.retrun_request(req, res, next, { user: user }) )
        .catch(err => next(err))
};

/**
 * Post new user
 */
exports.post_user = [

    body('user')
        .exists().withMessage('No user object provided.'),
    body('user.email')
        .exists().withMessage('Email must be specified.')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
    body('user.password')
        .exists().withMessage('Password must be specified')
        .isLength({min: 5}).withMessage('passwords must be at least 5 chars long and contain one number')
        .matches(/\d/).withMessage('passwords must be at least 5 chars long and contain one number'),

    sanitizeBody('user.email').trim().normalizeEmail().escape(),
    sanitizeBody('user.password').trim().escape(),
    sanitizeBody('user.name').trim().escape(),
    sanitizeBody('user.surname').trim().escape(),

    (req, res, next) => {

        let requested_user = req.body.user;

        if (abstractController.body_is_valid(req, res, next, requested_user)) {
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

/**
 * Update user data, no password and salt
 */
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

        let requested_user = req.body.user;

        if (abstractController.body_is_valid(req, res, next, requested_user)) {
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
                    let new_active = req.body.user.active;
                    if (new_active !== undefined) {
                        user.active = new_active;
                    }

                    save_user(req, res, next, user, requested_user);

                })
                .catch(err => next(err));
        }
    }
];

/**
 * Reset user password
 */
exports.reset_user_password = [

    body('user')
        .exists().withMessage('No user object provided.'),
    body('user.email')
        .exists().withMessage('Email must be specified.')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
    body('user.oldPassword')
        .exists().withMessage('OldPassword must be specified')
        .isLength({min: 5}).withMessage('passwords must be at least 5 chars long and contain one number')
        .matches(/\d/).withMessage('passwords must be at least 5 chars long and contain one number'),
    body('user.newPassword')
        .exists().withMessage('NewPassword must be specified')
        .isLength({min: 5}).withMessage('passwords must be at least 5 chars long and contain one number')
        .matches(/\d/).withMessage('passwords must be at least 5 chars long and contain one number'),

    sanitizeBody('user.email').trim().normalizeEmail().escape(),
    sanitizeBody('user.oldPassword').trim().escape(),
    sanitizeBody('user.newPassword').trim().escape(),

    (req, res, next) => {

        let requested_user = req.body.user;
        console.log(requested_user);

        if (abstractController.body_is_valid(req, res, next, requested_user)) {
            User.findById(req.params.id)
                .then(user => {

                    if (user.email === req.body.user.email) {

                        user.comparePassword(req.body.user.oldPassword)
                            .then(passwordMath => {

                                if (passwordMath) {
                                    user.password = req.body.user.newPassword;
                                    save_user(req, res, next, user, requested_user);
                                } else {
                                    let errorPayload = {
                                        errors: abstractController.create_error_object(
                                            'user.oldPassword',
                                            'The old password provided is not correct',
                                            req.body.user.oldPassword,
                                        ),
                                        requestObject: requested_user
                                    };
                                    abstractController.return_bad_request(req, res, next, errorPayload);
                                }
                            })
                            .catch(err => next(err));

                    } else {
                        let errorPayload = {
                            errors: abstractController.create_error_object(
                                'user.email',
                                'The email provided doesn\'t match',
                                req.body.user.email,
                            ),
                            requestObject: requested_user
                        };
                        abstractController.return_bad_request(req, res, next, errorPayload);
                    }

                })
                .catch(err => next(err));
        }
    }
];

/**
 * Delete user by id
 */
exports.delete_user = (req, res, next) => {

    User.findByIdAndDelete(req.params.id)
        .then(deletedUser => abstractController.retrun_request(req, res, next, { deletedUser: deletedUser }) )
        .catch(err => next(err))
};

/**
 * Save user data
 * @param req
 * @param res
 * @param next
 * @param user
 * @param requested_user
 */
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

/**
 * Get all user checking if should use active to filter
 * @param req
 * @param res
 * @param next
 * @param active
 */
const all_users = (req, res, next, active=undefined) => {

    let findFilter = {};
    if (active !== undefined) {
        findFilter = {
            active: active
        }
    }

    User.find(findFilter, '-password -salt')
        .then(users => {
            abstractController.retrun_request(req, res, next, {users: users})
        })
        .catch(err => next(err))
};