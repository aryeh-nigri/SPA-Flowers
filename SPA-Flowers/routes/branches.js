var express = require('express');
var router = express.Router();
var branches = require('../models/branches.json');

/* GET branches listing. */
router.get('/', function (req, res) {
    // let branches = JSON.parse(fs.readFileSync('./database/branches.json', 'utf-8'));
    res.render('partials/branches', {branches: branches} );
  });
  
module.exports = router;