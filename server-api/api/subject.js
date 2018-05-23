
const express = require('express');
const subjectController = require('../api-controller/subjectController');
const router = express.Router();

/**
 * Body should be an array of subject objects
 * {
 *      subject: {
 *              name: String,
 *              date_exam: Date,
 *              user: User.ObjectId || String
 *          }
 * }
 */
router.post('/', subjectController.post_subjects);

module.exports = router;