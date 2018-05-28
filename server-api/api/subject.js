
const express = require('express');
const subjectController = require('../api-controller/subjectController');
const router = express.Router();

/**
 * Post new subject
 * Body must be a subject object
 * {
 *      subject: {
 *              name: String,
 *              date_exam: Date,
 *              user: User.ObjectId || String
 *          }
 * }
 */
router.post('/', subjectController.post_subject);

/**
 * Get a specific subject
 * @param id must be mongo subject object id
 */
router.get('/:id', subjectController.get_subject);

module.exports = router;