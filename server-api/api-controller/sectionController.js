const abstractController = require('./abstractController');
const Section = require('../model/Section');
const Subject = require('../model/Subject');

const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const section_validation_array = [
    body('section')
        .exists().withMessage('No section object provided.'),
    body('section.name')
        .exists().withMessage('Section name must be specified.'),
    body('section.subject')
        .exists().withMessage('Section subject must be specified')
        .isMongoId().withMessage('Section subject must be a valid subject id'),

    sanitizeBody('section.name').trim().escape(),
    sanitizeBody('section.subject').trim().escape()
];


/**
 * Get all sections
 * @param req
 * @param res
 * @param next
 */
exports.get_all_sections = (req, res, next) => {

    Section.find()
        .then(sections => {
            abstractController.retrun_request(req, res, next, {sections: sections})
        })
        .catch(err => next(err))
};


/**
 * Create new subject
 * @type {*[]}
 */
exports.post_section = [

    section_validation_array,

    (req, res, next) => {

        let request_section = req.body.section;

        if (abstractController.body_is_valid(req, res, next, request_section)) {

            // check if user provided exist
            Subject.findById(request_section.subject)
                .then(subject => {

                    if (subject === null) {
                        let errorPayload = {
                            errors: abstractController.create_error_object('section.subject', 'Section subject not exist', request_section.subject),
                            requestObject: request_section
                        };
                        return abstractController.return_bad_request(req, res, next, errorPayload);
                    }

                    let section = new Section({
                        name: request_section.name,
                        subject: request_section.subject
                    });

                    section.save()
                        .then(sectionObject => {
                            abstractController.retrun_request(req, res, next, {section: sectionObject})
                        })
                        .catch(err => next(err))

                })
                .catch(err => {
                    console.log(err)
                })

        }
    }
];

/**
 * Get all sections of a specific subject
 */
exports.get_subject_sections = (req, res, next) => {

    Section.find({ subject: req.params.id })
        .then(sections => {
            abstractController.retrun_request(req, res, next, {sections: sections})
        })
        .catch(err => next(err))

};

/**
 * Delete section
 * @param req
 * @param res
 * @param next
 */
exports.delete_section = (req, res, next) => {

    Section.findByIdAndDelete(req.params.id)
        .then(deletedSection => abstractController.retrun_request(req, res, next, { deletedSection: deletedSection }) )
        .catch(err => next(err))
};