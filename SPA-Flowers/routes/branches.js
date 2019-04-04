var express = require("express");
var router = express.Router();
// var branchesjson = require('../models/branches.json');
var branches = require("../models/")("Branch");

/* GET branches listing. */
router.get("/", async (req, res) => {
  // Inquire all the users at once and get it as an array
  try {
    var branchesFromDB = await branches.REQUEST();
    //console.dir(users, { showHidden: true, colors: true });
    console.log(branchesFromDB);
    res.render("partials/branches", { branches: branchesFromDB });
  } catch (err) {
    debug(`Failed: ${err}`);
  }
});

router.post("/", async function(req, res) {
  const { address, isActive } = req.body;
  console.log(address + isActive);
  await branches.CREATE([isActive, address]);
  res.send({ response: "CREATED" });
});

router.put("/", async (req, res) => {
  const { id, address, isActive } = req.body;
  console.log(address + isActive + id);
  await branches.UPDATE(id, [isActive, address]);
  res.send({ response: "UPDATED" });
});

router.delete("/", async (req, res) => {
  var id = req.body.id;
  console.log(id);
  await branches.DELETE(id);
  res.send({ response: "DELETED" });
});

module.exports = router;
