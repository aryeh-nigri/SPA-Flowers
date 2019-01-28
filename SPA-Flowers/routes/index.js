var express = require('express');
var router = express.Router();
var users = require('../models/users.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: "null"});
});

router.get('/user/:userId', function(req, res) {
  console.log("recebi com params");
  // let users = JSON.parse(fs.readFileSync('./database/users.json', 'utf-8'));
  console.log(req.params.userId);

  users.users.forEach(user => {
    // console.log(user.name);
    if(user.name == req.params.userId){
      res.render('index', {user: user});
    }
  });
  
  if(!res)
    res.send("404"); 
});

module.exports = router;
