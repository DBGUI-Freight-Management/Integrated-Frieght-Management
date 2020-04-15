const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const session = require('express-session');
//mysql connection
var con = mysql.createConnection({
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
con.connect(function (err) {
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
	secret: 'freight',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
  }))

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

//Get ships
router.get('/ships/get', function (req, res) {
	con.query("SELECT * FROM ships", function (err, result, fields) {
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

//Delete a account type (You probably shouldn't do this)
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

//Code after endpoints
// REGISTER  ROUTES -------------------------------
app.use('/api', router);

//PORT ENVIRONMENT VARIABLE
const port = config.port;
app.listen(port, () => console.log(`Listening on port ${port}..`));