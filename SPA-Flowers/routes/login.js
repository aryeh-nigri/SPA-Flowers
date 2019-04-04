var express = require("express");
// var debug = require("debug")("server:login");
var router = express.Router();
// var users = require("../models/users.json");
var users = require("../models/")("User");

/* GET login listing. */
router.get("/", function(req, res) {
  res.render("login");
});

/* POST login listing. */
router.post("/", function(req, res) {
  console.log("LOGIN");
  console.log("\n=====================\n");
  let { email, password } = req.body;
  console.log(email);
  console.log(password);

  let user = users.findOne({ email, password });
  // console.log(user);

  users.findOne({ email }, function(err, user) {
    // debug(`User found`);
    console.log("User found");
    // In case the user not found
    if (err) {
      console.log("Email not found");
      // debug(`Email NOT found`);
      res.send("Failure");
    }
    if (user && user.password === password) {
      console.log("User and password is correct");
      // debug(`User and password is correct`);
      res.json(user);
    } else {
      console.log("Wrong password!");
      // debug(`Wrong password!`);
      res.send("Failure");
    }
  });
});

module.exports = router;
