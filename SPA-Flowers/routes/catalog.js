var express = require('express');
var router = express.Router();
var flowers = require('../models/flowers.json');

/* GET catalog listing. */
router.get('/', function (req, res) {
    // let flowers = JSON.parse(fs.readFileSync('./models/flowers.json', 'utf-8'));
    res.render('partials/catalog', {flowers: flowers} );
  });
  
module.exports = router;