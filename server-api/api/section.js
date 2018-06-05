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
 *              user: User.ObjectId || String
 *          }
 * }
 */
router.post('/', sectionController.post_section);

/**
 * Delete a specific section
 * @param id id must be mongo section object id
 */
router.delete('/:id', sectionController.delete_section);

module.exports = router;