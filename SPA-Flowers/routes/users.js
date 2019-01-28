var express = require('express');
var router = express.Router();
var users = require('../models/users.json');

/* GET users listing. */
router.get('/', function (req, res) {
  // let users = JSON.parse(fs.readFileSync('./database/users.json', 'utf-8'));
  res.render('partials/users', {users: users} );
});

module.exports = router;
