var express = require('express');
var router = express.Router();
// const fs = require('fs');
var users = require('../models/users.json');

/* GET login listing. */
router.get('/', function(req, res) {
    res.render('login');
  });

/* POST login listing. */
router.post('/', function (req, res) {
    console.log("POST");
    console.log("\n=====================\n");
    let data = req.body;
    console.log(data.email);
    console.log(data.password);
    console.log("\n=====================\n");
  
    // console.log("ANTES DE LER");
    // let users = JSON.parse(fs.readFileSync('./models/users.json', 'utf-8'));
    // console.log("DEPOIS DE LER");
    console.log("USERS: " + users);
    
    users.users.forEach(user => {
      if(user.email == data.email && user.password == data.password){
        res.json(user);
      }
    });
  
    if(!res)
      res.send("Failure");
    
  });
  
module.exports = router;