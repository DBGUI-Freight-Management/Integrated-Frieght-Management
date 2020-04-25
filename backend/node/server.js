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


app.use(session({
	secret:"Oooga Booga",
	resave: true,
	saveUninitialized: true,
	cookie:{
		maxAge:600000
	}
  }))

app.use(cookieParser());

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// create router
var router = express.Router();

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
	console.log(req.params);
	con.query(`SELECT userID,firstName,lastName,accountType from users WHERE username='${req.params.user}' AND password='${req.params.pass}';`,function(err,rows,fields){
		if(!err){
			if(rows.size!=0){
				console.log(rows);
				req.session.userID=rows[0].userID;
				req.session.firstName=rows[0].firstName;
				req.session.lastName=rows[0].lastName;
				req.session.accountType=rows[0].accountType;
				req.session.isLoggedIn=true;
				req.session.save()
				res.send(true);
			}else {
				req.session.isLoggedIn=false;
				req.session.save();
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
	con.query("SELECT * FROM ships WHERE companyID = " +
		${req.query.companyID} + ";", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get ships with destinations
router.get('/ships/getWithDestinations', function (req, res) {
	//statusLog = 'active'
	con.query("SELECT * FROM ships s INNER JOIN trips t " +
		"ON s.tripID = t.tripID WHERE s.statusLog = \'on route\' AND companyID = " +
		${req.query.companyID} + ";", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get all ship logs for a particular ship
router.get('/ships/getLogs', function (req, res) {
	con.query("SELECT l.* FROM trips t INNER JOIN logs l WHERE t.shipID = " +
		${req.query.shipID} + ";", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get the log for a certain ship at a given location
router.get('/ships/getLog', function (req, res) {
	con.query("SELECT l.* FROM trips t INNER JOIN logs l WHERE t.shipID = " +
		${req.query.shipID} + " AND l.location = " + ${req.query.location} + ";", function (err, result, fields) {
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

router.get('/session/logs/:userID', function(req,res){
	let sql=`SELECT header, message, route, writer, date, location FROM log JOIN route ON log.route = route.id JOIN captain ON captain.captainID = route.captain WHERE captain.captainID = '${req.params.userID}';`;
	console.log(sql);
	console.log(req.session);
	con.query(sql,function(err,rows,fields){
		if(!err){
			res.send(rows);
		}
	})
})

//Code after endpoints
// REGISTER  ROUTES -------------------------------
app.use('/api', router);

//PORT ENVIRONMENT VARIABLE
const port = config.port;
app.listen(port, () => console.log(`Listening on port ${port}..`));