var express = require('express');
var router = express.Router();

/* GET about-us listing. */
router.get('/', function(req, res) {
    res.render('partials/about-us');
  });
  
module.exports = router;