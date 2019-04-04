var express = require("express");
var router = express.Router();
// var flowers = require('../models/flowers.json');
var flowers = require("../models/")("Flower");

/* GET catalog listing. */
router.get("/", async (req, res) => {
  // Inquire all the flowers at once and get it as an array
  try {
    var flowersFromDB = await flowers.REQUEST();
    //console.dir(users, { showHidden: true, colors: true });
    console.log(flowersFromDB);
    res.render("partials/catalog", { flowers: flowersFromDB });
  } catch (err) {
    // debug(`Failed: ${err}`);
    console.log(`Failed: ${err}`);
  }
});

router.post("/", async function(req, res) {
  const { name, color, picture, price } = req.body;
  console.log(name + color + picture + price);
  await flowers.CREATE([name, color, picture, price]);
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
  await flowers.DELETE(id);
  res.send({ response: "DELETED" });
});

module.exports = router;
