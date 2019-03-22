var express = require('express');
var router = express.Router();
// var branchesjson = require('../models/branches.json');
var branches = require('../models/')('Branch');

/* GET branches listing. */
router.get('/', async function (req, res) {
    // Inquire all the users at once and get it as an array
    try {
        var branchesFromDB = await branches.REQUEST();
        //console.dir(users, { showHidden: true, colors: true });
        console.log(branchesFromDB);
        res.render('partials/branches', {branches: branchesFromDB} )
    } catch (err) { debug(`Failed: ${err}`) }
});
  
  router.post('/', function (req, res) {
    var address = req.body.address;
    var id = req.body.ID;
    var isActive;
    if(req.body.isActive)
      isActive = true;
    else 
      isActive = false;
      
    console.log(address + id + isActive);
    
    branches.CREATE([isActive, address, id]);

    console.log("req Base: " + req.baseUrl + "req original:" + req.originalUrl + "req url:" + req.url);
    

    var actualURL = req.originalUrl;
    res.redirect(actualURL);

    // let branches = JSON.parse(fs.readFileSync('./database/branches.json', 'utf-8'));
    //res.render('partials/branches', {branches: branches} );
  });
module.exports = router;