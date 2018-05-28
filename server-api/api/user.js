
const express = require('express');
const userController = require('../api-controller/userController');
const subjectController = require('../api-controller/subjectController');
const router = express.Router();

/**
 * Get all user
 */
router.get('/', userController.get_all_user);

/**
 * Return user document searched by id (no password and salt)
 * @param id must be mongo id object
 */
router.get('/:id', userController.get_user);

/**
 * Get all user filtered by active
 * @param active must be 1 or 0
 *      if active = 1 -> return all user with active: true
 *      if active = 0 -> return all user with active: false
 */
router.get('/active/:active', userController.get_all_user_active);

/**
 * Post new user
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

/**
 * Update user document, no password use specific request
 * @param id must be mongo user object id
 * Body must be an object with user data
 * {
 *      user: {
 *              email: String,
 *              active: true [optional],
 *              name: String [optional],
 *              surname: String [optional]
 *      }
 * }
 */
router.put('/:id', userController.update_user);

/**
 * Reset user password
 * @param id must be mongo user object id
 * Body must be an object with user password data
 * {
 *      user: {
 *              email: String,
 *              oldPassword: String,
 *              newPassword: String
 *      }
 * }
 */
router.put('/:id/password', userController.reset_user_password);

/**
 * Delete user document
 * @param id must be mongo user object id
 */
router.delete('/:id', userController.delete_user);

/**
 * Get all user subjects
 * @param id must be mongo user object id
 */
router.get('/:id/subjects', subjectController.get_user_subjects);

module.exports = router;