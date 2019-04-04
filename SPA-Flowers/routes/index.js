var express = require("express");
var router = express.Router();
// var users = require('../models/users.json');
var users = require("../models/")("User");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { user: "null" });
});

router.get("/user/:userId/:type", function(req, res) {
  console.log("recebi com params");

  let { userId, type } = req.params;
  console.log(userId);
  console.log(type);

  users.findOne({ name: userId, securityLevel: type }, function(err, user) {
    console.log("User found ");
    // In case the user not found
    if (err) {
      console.log("Username not found");
      res.send("404");
    }
    if (user) {
      console.log("User found");
      res.render("index", { user });
    } else {
      console.log("SOme error");
      res.send("404");
    }
  });
});

module.exports = router;
