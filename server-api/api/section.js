const express = require('express');
const sectionController = require('../api-controller/sectionController');
const router = express.Router();

/**
 * Get all sections
 */
router.get('/', sectionController.get_all_sections);

/**
 * Post new section
 * Body must be a section object
 * {
 *      section: {
 *              name: String,
 *              subject: Subject.ObjectId
 *          }
 * }
 */
router.post('/', sectionController.post_section);

/**
 * Get a specific section
 * @param id must be mongo section object id
 */
router.get('/:id', sectionController.get_section);

/**
 * Update a specific section
 * @param id must be mongo section object id
 * Body must be a section object
 * {
 *      subject: {
 *              name: String,
 *              subject: Subject.ObjectId
 *          }
 * }
 */
router.put('/:id', sectionController.update_section);

/**
 * Delete a specific section
 * @param id id must be mongo section object id
 */
router.delete('/:id', sectionController.delete_section);

module.exports = router;