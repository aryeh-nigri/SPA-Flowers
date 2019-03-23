var express = require('express');
var router = express.Router();
// var branchesjson = require('../models/branches.json');
var branches = require('../models/')('Branch');

/* GET branches listing. */
router.get('/', renderBranches);

router.post('/', async function (req, res) {
    var address = req.body.address;
    var id = req.body.id;
    var isActive;
    if(req.body.isActive)
      isActive = true;
    else 
      isActive = false;
      
    console.log(address + id + isActive);
    
    await branches.CREATE([isActive, address, id]);

    res.send({response: "CREATED"});

    // let branches = JSON.parse(fs.readFileSync('./database/branches.json', 'utf-8'));
    //res.render('partials/branches', {branches: branches} );
  });


  async function renderBranches(req, res) {
    // Inquire all the users at once and get it as an array
    try {
        var branchesFromDB = await branches.REQUEST();
        //console.dir(users, { showHidden: true, colors: true });
        console.log(branchesFromDB);
        res.render('partials/branches', {branches: branchesFromDB} )
    } catch (err) { debug(`Failed: ${err}`) }
}
module.exports = router;