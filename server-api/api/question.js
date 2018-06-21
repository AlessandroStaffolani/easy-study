const express = require('express');
const questionController = require('../api-controller/questionController');
const router = express.Router();

/**
 * Get all questions
 */
router.get('/', questionController.get_all_questions);

/**
 * Post new question
 * Body must be a section object
 * {
 *      question: {
 *              value: type: String,
 *              important: type: Boolean // default: false,
 *              result: type: Number // possible values: {-1, 0, 1} -1 = red, 0 = orange, 1 = green [optional],
 *              note: type: String [optional],
 *              images: type: Array // array of images {fileName, label} [optional],
 *              section: Section.ObjectId
 *          }
 * }
 */
router.post('/', questionController.post_question);

/**
 * Get a specific section
 * @param id must be mongo section object id
 */
/*router.get('/:id', questionController.get_section);

/!**
 * Update a specific question
 * @param id must be mongo question object id
 * Body must be a question object
 * {
 *      question: {
 *              value: type: String,
 *              important: type: Boolean // default: false,
 *              result: type: Number // possible values: {undefined, -1, 0, 1} -1 = red, 0 = orange, 1 = green
 *              section: Section.ObjectId
 *          }
 * }
 *!/
router.put('/:id', questionController.update_section);

/!**
 * Delete a specific section
 * @param id id must be mongo section object id
 *!/
router.delete('/:id', questionController.delete_section);*/

module.exports = router;