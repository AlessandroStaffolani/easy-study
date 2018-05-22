const abstractController = require('./abstractController');
const Subject = require('../model/Subject');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.post_subjects = [

    body('subjects')
        .exists().withMessage('Param subjects missing')
        .isArray().withMessage('Param subjects must be an array'),

    (req, res, next) => {

        request_subjects = req.subjects;

        // controllo i dati trasmessi
        if (!Array.isArray(request_subjects)) {
            // object is not array, errore
            abstractController.return_bad_request(req, res, next, request_subjects)
        }
        /*TODO Testare se la funzione si blocca quando ci sono gli errori o no */

        request_subjects.map(subject => {

        })

    }
];