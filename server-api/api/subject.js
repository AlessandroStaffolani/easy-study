
const express = require('express');
const subjectController = require('../api-controller/subjectController');
const sectionController = require('../api-controller/sectionController');
const router = express.Router();

/**
 * Get all subjects
 */
router.get('/', subjectController.get_all_subjects);

/**
 * Post new subject
 * Body must be a subject object
 * {
 *      subject: {
 *              name: String,
 *              date_exam: Date,
 *              user: User.ObjectId
 *          }
 * }
 */
router.post('/', subjectController.post_subject);

/**
 * Get a specific subject
 * @param id must be mongo subject object id
 */
router.get('/:id', subjectController.get_subject);

/**
 * Update a specific subject
 * @param id must be mongo subject object id
 * Body must be a subject object
 * {
 *      subject: {
 *              name: String,
 *              date_exam: Date,
 *              user: User.ObjectId
 *          }
 * }
 */
router.put('/:id', subjectController.update_subject);

/**
 * Delete a specific subject
 * @param id id must be mongo subject object id
 */
router.delete('/:id', subjectController.delete_subject);

/**
 * Get all subject sections
 * @param id id must be mongo subject object id
 */
router.get('/:id/sections', sectionController.get_subject_sections);

module.exports = router;