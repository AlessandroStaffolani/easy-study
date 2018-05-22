
const express = require('express');
const userController = require('../api-controller/userController');
const router = express.Router();

/**
 * Id must be mongo id object
 */
router.get('/:id', userController.get_user);

/**
 * Body must be an object with user data
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

router.put('/:id', userController.update_user);

module.exports = router;