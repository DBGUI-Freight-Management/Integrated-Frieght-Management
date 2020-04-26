const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//mysql connection
var con = mysql.createPool({
  host: 'backend-db',
  port: '3306',
  user: 'manager',
  password: 'Password',
  database: 'db'
});

//set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

//Attempting to connect to the database.
con.query(`SELECT 'something sweet';`,function(err,rows,fields) {

	if (err){
		console.log(err);
		logger.error("Cannot connect to DB!");
	}
	else {
		
		logger.info("Connected to the DB!");
	}
  });


//create the express.js object
const app = express();




app.use(cookieParser());

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// create router
var router = express.Router();

app.use(session({
	secret:"Oooga Booga",
	resave:false,
	saveUninitialized:true,
	httponly:false
  }))

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

//companies

//Get companies
router.get('/companies/get', function (req, res) {
	con.query("SELECT * FROM companies", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});


router.get('/login/:user/:pass',function(req,res){
	
	con.query(`SELECT userID,firstName,lastName,accountType from users WHERE username='${req.params.user}' AND password='${req.params.pass}';`,function(err,rows,fields){
		if(!err){
			if(rows.length!==0){
				console.log(rows);
				req.session.userID=rows[0].userID;
				req.session.firstName=rows[0].firstName;
				req.session.lastName=rows[0].lastName;
				req.session.accountType=rows[0].accountType;
				req.session.isLoggedIn=true;
				res.send(rows[0]);
			}else {
				req.session.isLoggedIn=false;
				res.send(false);
			}
		}else {
			res.send(false);
		}
	})
	
})

router.get('/isLoggedIn',function(req,res){
	console.log(req.session);
	if(req.session.isLoggedIn===true){
		res.send("true");
	} else {
		res.send("false");
	}
})

//Post a new company
router.post('/companies/post', async (req, res) => {
  let sql = `INSERT INTO companies(companyName, freightManagerID) VALUES (\'${req.query.name}\', ${req.query.freightManagerID})`;
  res.send(req.params);
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Delete a company
router.delete('/companies/:id/delete', async (req, res) => {
  let sql = `DELETE FROM companies WHERE companyID = ${req.params.id}`;
  console.log(sql);
	con.query(sql,function (err, result, fields) {
		if (err)
			return console.error(error.message);
		res.end(JSON.stringify(result));
	  });
});

//ships

//Get ALL ships in the database
router.get('/ships/get', function (req, res) {
	con.query("SELECT * FROM ships", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get ships based on what company the user works for
router.get('/ships/get', function (req, res) {
	con.query("SELECT * FROM ships WHERE companyID = ${req.query.companyID};", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get active ships ("on route") for user's company
router.get('/ships/getActiveShips', function (req, res) {
	//statusLog = 'active'
	con.query("SELECT * FROM ships s INNER JOIN trips t " + "ON s.tripID = t.tripID WHERE s.statusLog = \'on route\' AND companyID = " + req.query.companyID + ";", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get current location of a ship
router.get('/ships/getLocation', function (req, res) {
	con.query("SELECT currentLoc FROM ships WHERE shipID = ${req.query.shipID};", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get current status of a ship
router.get('/ships/getStatus', function (req, res) {
	con.query("SELECT statusLog FROM ships WHERE shipID = ${req.query.shipID};", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Post a new ship
router.post('/ships/post', async (req, res) => {
  let sql = `INSERT INTO ships(shipName, companyID) VALUES (\'${req.query.name}\', ${req.query.companyid})`;
  res.send(req.params);
  console.log(sql);
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Delete a ship
router.delete('/ships/:id/delete', async (req, res) => {
  let sql = `DELETE FROM ships WHERE shipID = ${req.params.id}`;
  console.log(sql);
	con.query(sql,function (err, result, fields) {
		if (err)
			return console.error(error.message);
		res.end(JSON.stringify(result));
	  });
});

//logs

//Get all ship logs for a particular ship
router.get('/ships/getLogs', function (req, res) {
	con.query("SELECT l.* FROM trips t INNER JOIN logs l WHERE t.shipID = " + req.query.shipID + ";", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get the log for a certain ship at a given location
router.get('/ships/getLog', function (req, res) {
	con.query("SELECT l.* FROM trips t INNER JOIN logs l WHERE t.shipID = " + req.query.shipID + " AND l.location = " + req.query.location + ";", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//accountTypes

//Get accountTypes
router.get('/accountTypes/get', function (req, res) {
	con.query("SELECT * FROM accountTypes", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Post a new account type (You probably shouldn't do this)
router.post('/accountTypes/post', async (req, res) => {
  let sql = `INSERT INTO accountTypes(name, description) VALUES (\'${req.query.name}\', \'${req.query.description}\')`;
  res.send(req.params);
  console.log(sql);
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Delete an account type (You probably shouldn't do this)
router.delete('/accountTypes/:id/delete', async (req, res) => {
  let sql = `DELETE FROM accountTypes WHERE typeID  = ${req.params.id}`;
  console.log(sql);
	con.query(sql,function (err, result, fields) {
		if (err)
			return console.error(error.message);
		res.end(JSON.stringify(result));
	  });
});

//users

//Get users
router.get('/users/get', function (req, res) {
	con.query("SELECT * FROM users", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get all captains
router.get('/users/getCaptains', function (req, res) {
	con.query("SELECT * FROM users WHERE accountType = 1", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Post a user
router.post('/users/post', async (req, res) => {
  let sql = `INSERT INTO users(password, username, email, firstName, lastName phone, accountType) VALUES (\'${req.query.password}\', \'${req.query.username}\', \'${req.query.email}\', \'${req.query.firstName}\', \'${req.query.lastName}\', ${req.query.phone}, ${req.query.type})`;
  res.send(req.params);
  console.log(sql);
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Delete a user
router.delete('/users/:id/delete', async (req, res) => {
  let sql = `DELETE FROM users WHERE userID = ${req.params.id}`;
  console.log(sql);
	con.query(sql,function (err, result, fields) {
		if (err)
			return console.error(error.message);
		res.end(JSON.stringify(result));
	  });
});

//crew

//Get all crew
router.get('/crew/get', function (req, res) {
	con.query("SELECT * FROM crew", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get crew for a specific ship by ID
router.delete('/crew/get/:id', async (req, res) => {
  let sql = `SELECT * FROM crew WHERE shipID = ${req.params.id}`;
  console.log(sql);
	con.query(sql,function (err, result, fields) {
		if (err)
			return console.error(error.message);
		res.end(JSON.stringify(result));
	  });
});

//Get crew for a specific ship by ship name
router.delete('/crew/get/:name', async (req, res) => {
  let sql = `SELECT c.id, c.firstName, c.lastName, c.position, c.dateBoarded FROM crew c INNER JOIN ships s ON s.shipID = c.shipID WHERE s.shipName = \'${req.params.name}\'`;
  console.log(sql);
	con.query(sql,function (err, result, fields) {
		if (err)
			return console.error(error.message);
		res.end(JSON.stringify(result));
	  });
});

//Post a crew member
router.post('/crew/post', async (req, res) => {
  let sql = `INSERT INTO crew(firstName, lastName, shipID, position, dateBoarded) VALUES (\'${req.query.firstName}\', \'${req.query.lastName}\', ${req.query.shipID}, \'${req.query.position}\', \'${req.query.dateBoarded}\')`;
  res.send(req.params);
  console.log(sql);
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Delete a crew member
router.delete('/crew/:id/delete', async (req, res) => {
  let sql = `DELETE FROM crew WHERE crewID = ${req.params.id}`;
  console.log(sql);
	con.query(sql,function (err, result, fields) {
		if (err)
			return console.error(error.message);
		res.end(JSON.stringify(result));
	  });
});

// // PUT
// router.put('/products/:code/post/:quantity', async (req, res) => {
//   let sql = `UPDATE products SET quantityInStock = ${req.params.quantity}
//              WHERE productCode = '${req.params.code}'`;
//   console.log(sql);
// 	con.query(sql, function (err, result, fields) {
// 		if (err) throw err;
// 		//console.log(result);
// 		res.end(JSON.stringify(result)); 
// 	});
// });

router.get('/session/logs', function(req,res){
	let sql=`SELECT header, message, route, writer, date, location FROM log JOIN route ON log.route = route.id JOIN captain ON captain.captainID = route.captain WHERE captain.captainID = '${req.session.userID}';`;
	console.log(sql);
	con.query(sql,function(err,rows,fields){
		if(!err){
			res.send(rows);
		}
	})
})





router.post('/session/logs/create',function(req,res){
	let user = req.session.userID;
	console.log(req.body);
	con.query(`SELECT captainID FROM users JOIN captain ON userID = captainID WHERE userID='${user}'`,function(err,rows,fields){
		if(rows.length!==0){
			con.query(`SELECT id FROM route JOIN captain ON route.captain = captain.captainID WHERE route.captain='${user}' AND route.actualEndDate is null;`,function(err2,row2,fields2){
				con.query(`INSERT INTO log (header, message, route, writer, date, location) VALUES ('${req.body.header}', '${req.body.message}', '${row2[0].id}', '${user}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}','${req.body.location}');`,function(err3,row3,fields3){
					res.send();
				})
			})
		}
	})
})


router.get('/session/statuses', function(req,res){
	let sql=`SELECT status, date, location FROM status JOIN route ON status.route = route.id JOIN captain ON captain.captainID = route.captain WHERE captain.captainID = '${req.session.userID}';`;
	console.log(sql);
	con.query(sql,function(err,rows,fields){
		if(!err){
			res.send(rows);
		}
	})
})

router.get('/session/userType',function(req,res){
	con.query(`SELECT accountTypes.name FROM accountTypes JOIN users ON accountTypes.typeID = users.accountType WHERE users.userID='${req.session.userID}'`,function(err,rows,fields){
		res.send(rows);
	})
})

router.post('/session/statuses/create',function(req,res){
	let user = req.session.userID;
	console.log(req.body);
	con.query(`SELECT captainID FROM users JOIN captain ON userID = captainID WHERE userID='${user}'`,function(err,rows,fields){
		if(rows.length!==0){
			con.query(`SELECT id FROM route JOIN captain ON route.captain = captain.captainID WHERE route.captain='${user}' AND route.actualEndDate is null;`,function(err2,row2,fields2){
				console.log(`INSERT INTO status (status, route, date, location) VALUES ('${req.body.status}', '${row2[0].id}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}','${req.body.location}');`);
				con.query(`INSERT INTO status (status, route, date, location) VALUES ('${req.body.status}', '${row2[0].id}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}','${req.body.location}');`,function(err3,row3,fields3){
					res.send();
				})
			})
		}
	})
})


router.get('/session/getUserInfo',function(req,res){
	con.query(`SELECT firstName, lastName FROM users WHERE users.userID=${req.session.userID}`,function(err,rows,fields){
		res.send(rows);
	})
})


router.get('/session/crew',function(req,res){
	con.query(`SELECT crew.id,fname,lname,role, dateBoarded as date, dateDeboarded FROM db.crew JOIN db.route ON crew.ship=route.ship JOIN captain ON captain.captainID = route.captain WHERE route.actualEndDate is null AND captain.captainID='${req.session.userID}';`,function(err,rows,fields){
		res.send(rows);
	})
})

router.post('/session/crew',function(req,res){

	req.session.userID && con.query(`SELECT ship FROM route WHERE route.captain='${req.session.userID}' AND route.actualEndDate is null;`,function(err,row,fields){
		console.log(`INSERT INTO db.crew(fname,lname,role,ship,dateBoarded) VALUES('${req.body.newFName}','${req.body.newLName}', '${req.body.newRole}', '${row[0].ship}','${new Date().toISOString().slice(0, 10).replace('T', ' ')}');`);
		con.query(`INSERT INTO db.crew(fname,lname,role,ship,dateBoarded) VALUES('${req.body.newFName}','${req.body.newLName}', '${req.body.newRole}', '${row[0].ship}','${new Date().toISOString().slice(0, 10).replace('T', ' ')}');`,function(err2,row2,fields2){
			if(err){
				res.send(err2);
			}else {
				res.send(200);
			}
		})
	})
});


router.get('/session/ship',function(req,res){
	con.query(`SELECT ship.name FROM ship JOIN route ON ship.id = route.ship JOIN captain ON route.captain = captain.captainID WHERE route.actualEndDate is null AND captain.captainID='${req.session.userID}';`,function(err,rows,fields){
		res.send(rows);
	})
});

router.get('/session/cargo',function(req,res){
	console.log(`SELECT cargo.name, companies.companyName, cargo.quantity,cargo.id FROM cargo JOIN companies ON cargo.owner = companies.companyID JOIN route ON cargo.route = route.id JOIN captain ON captain.captainID= route.captain WHERE route.actualEndDate is null and captain.captainID='${req.session.userID}';`);
	con.query(`SELECT cargo.name, companies.companyName, cargo.quantity,cargo.id FROM cargo JOIN companies ON cargo.owner = companies.companyID JOIN route ON cargo.route = route.id JOIN captain ON captain.captainID= route.captain WHERE route.actualEndDate is null and captain.captainID='${req.session.userID}';`, function(err,rows,fields){
		res.send(rows);
	})
})

router.post('/session/cargo',function(req,res){
	
	con.query(`SELECT route.id FROM route WHERE route.captain='${req.session.userID}' AND route.actualEndDate is null`,function(err, routeId,fields){
		
		con.query(`INSERT INTO cargo(name,owner,quantity,route) VALUES('${req.body.name}','${req.body.owner}','${req.body.quantity}','${routeId[0].id}')`,function(err2,rows,fields2){
			res.send(200);
		})
	})
})


router.get('/session/currentRoute',function(req,res){
	console.log(`SELECT * FROM route WHERE captain ='${req.session.userID}' AND route.actualEndDate is null;`)
	con.query(`SELECT * FROM route WHERE captain ='${req.session.userID}' AND route.actualEndDate is null;`,function(err,rows,fields){
		console.log(rows);
		res.send(rows);
	})
})

router.put('/session/currentRoute/complete',function(req,res){
	con.query(`UPDATE route SET actualEndDate = '${new Date().toISOString().slice(0, 10).replace('T', ' ')}' WHERE (captain = '${req.session.userID}');`,function(err,rows,fields){
		if(!err){
			res.send(200);
		}
	})
})

router.post('/session/currentRoute/deboard',function(req,res){
	
	con.query(`UPDATE crew SET dateDeboarded='${new Date().toISOString().slice(0, 10).replace('T', ' ')}' WHERE (id='${req.body.crewMember}')`,function(err,rows,fields){
		res.send(200);
	})
})

router.delete('/session/cargo')
//Code after endpoints
// REGISTER  ROUTES -------------------------------
app.use('/api', router);

//PORT ENVIRONMENT VARIABLE
const port = config.port;
app.listen(port, () => console.log(`Listening on port ${port}..`));