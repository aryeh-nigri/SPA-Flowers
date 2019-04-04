var express = require("express");
var router = express.Router();
// var users = require("../models/users.json");
var users = require("../models/")("User");

/* GET users listing. */
router.get("/", async (req, res) => {
  // Inquire all the users at once and get it as an array
  try {
    var usersFromDB = await users.REQUEST();
    console.log(usersFromDB);
    res.render("partials/users", { users: usersFromDB });
  } catch (err) {
    debug(`Failed: ${err}`);
  }
});

router.post("/", async function(req, res) {
  const { name, password, email, address, securityLevel } = req.body;
  console.log(name + password + email + address + securityLevel);
  await users.CREATE([name, password, email, address, securityLevel]);
  res.send({ response: "CREATED" });
});

router.put("/", async (req, res) => {
  const { name, password, email, address, securityLevel } = req.body;

  await users.UPDATE(id, []);
  res.send({ response: "UPDATED" });
});

router.delete("/", async (req, res) => {
  var id = req.body.id;
  console.log(id);
  await users.DELETE(id);
  res.send({ response: "DELETED" });
});

module.exports = router;
