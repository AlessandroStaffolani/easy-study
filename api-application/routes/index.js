/**
 *Module dependencies
 */

const express = require('express');

//==============================================================================

/**
 *Create router instance
 */

const router = express.Router();

//==============================================================================

/**
 *Routes
 */

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Easy Study API Application' });
});

router.post('/subjects', )

module.exports = router;
