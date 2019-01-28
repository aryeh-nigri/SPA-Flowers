var express = require('express');
var router = express.Router();

/* GET contact-us listing. */
router.get('/', function(req, res) {
    res.render('partials/contact-us');
  });
  
module.exports = router;