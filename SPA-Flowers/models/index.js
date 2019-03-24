const debug = require("debug")("mongo:model");	
const mongo = require("mongoose");	
let db = mongo.createConnection();	
(async () => {	
     try {
       console.log("estou na criacao do DB");
       
      await db.openUri('mongodb+srv://zeev_noiman:Projetofinal10@machonlevproject-qb49v.mongodb.net/flowers-shop?retryWrites=true');	
    } catch (err) {	
        debug("Error connecting to DB: " + err);	
      }	
})();	
	debug('Pending DB connection');	
	require("./usersdb")(db);		
	require("./flowersdb")(db);	
	require("./branchesdb")(db);	
	module.exports = model => db.model(model);	
