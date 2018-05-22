
const express = require('express');
const userController = require('../api-controller/userController');
const router = express.Router();

/**
 * Body should be an object with user data
 * {
 *      user: {
 *              email: String,
 *              password: String,
 *              name: String [optional],
 *              surname: String [optional]
 *      }
 * }
 */
router.post('/', userController.post_user);

module.exports = router;