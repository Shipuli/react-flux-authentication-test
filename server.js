import express from 'express';
import path from 'path';
import fs from 'fs';
import httpProxy from 'http-proxy';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import validator from 'validator';
import bcrypt from'bcrypt-nodejs';
import sqlite from 'sqlite3';
import React from 'react';
import Router from 'react-router';
import routes from './src/routes';

var proxy = httpProxy.createProxyServer(); 
var app = express();

//Variables needed to configure server
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;

//Create database file if doesn't exist already
var file = path.resolve(__dirname, 'db', 'users.db');
var exists = fs.existsSync(file);
if(!exists){
	console.log("Creating DB");
	fs.openSync(file, 'w');
}

//Create a database or connect to a existing one
var sqlite3 = sqlite.verbose();
var db = new sqlite3.Database(file);
db.serialize(function() {
	if(!exists) {
		db.run("CREATE TABLE Users(name TEXT, pwrd TEXT)");
		bcrypt.hash('YourAdminPswrd',null, null, function(err, hash){
			if(err){
				console.log("Failed to create Admin account");
			}else{
				var stmt = db.prepare("INSERT INTO Users VALUES (?,?)");
				stmt.run("Admin",hash);
				stmt.finalize();
			}
		});
	}
});

//Express init
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));


//Development bundling
if(!isProduction){
	var bundle = require('./server/bundle.js');
	bundle();
	app.all('/public/*', function(req,res) {
		proxy.web(req,res, {
			target: 'http://localhost:8080'
		});
	});
}

//Login authentication
app.post('/login', function(req,res){
	var name = validator.escape(req.body.name);
	var pass = validator.escape(req.body.pass);
	db.all(("SELECT pwrd FROM Users WHERE name='" + name + "'"), function(err, rows) {
		if(err) {
			console.log(err);
			res.status(500).end();
		}else{
			if(rows.length > 0) {
				bcrypt.compare(pass,rows[0].pwrd,function(err,rt) {
					if(err){
						res.status(500).end();
					}else{
						if(rt) {
							//Set up jwt token for automatic-authentication
							var token = jwt.sign(name, 'hotdogeseverywhere', {expiresInMinutes : 60*12});
							res.cookie('token', token, {maxAge:1000*60*60*12, httpOnly:true});
							res.send(name);
						}else{
							res.send(rt);
						}
					}
				});
			}else{
				res.send(false);
			}
		}
	})
});

//logout wow
app.get('/logout', function(req, res){
	res.clearCookie('token'); //clear token from client cookies;
	res.send();
})

//auto-login through tokens
app.get('/auto', function(req,res){
	if(req.cookies.token){
		let decoded = jwt.verify(req.cookies.token, 'hotdogeseverywhere');
		db.all('SELECT name FROM Users WHERE name=' +"'" +validator.escape(decoded) +"'", function(err, rows){
			if(rows.length > 0 ){
				res.send(decoded);
			}else{
				res.send(false);
			}
		})
	}else{
		res.send(false);
	}
	
});

//Sign up handler
app.post('/signup', function(req,res){
	var name = validator.escape(req.body.name);
	var pass = validator.escape(req.body.pass);
	db.all('SELECT name FROM Users WHERE name=' +"'"+name + "'", function(err, rows){
		if(err){
			console.log(err);
			res.send(false);
		}else{
			if(rows.length > 0){
				res.send(false);
			}else{
				var ap = bcrypt.hash(pass,null, null, function(err, hash){
					if(err){
						console.log("Failed to create User account");
						res.send(false);
					}else{
						var stmt = db.prepare("INSERT INTO Users VALUES (?,?)");
						stmt.run(name,hash);
						stmt.finalize();
						res.send(true);
					}
				});
			}
		}
	});
})

//App routing
app.get('/*', function(req,res) {
	let router = Router.create({
		router:routes,
		location:req.url
	});
	router.run(Handler => {
		let content  = React.renderToString(<Handler />);
		res.render('index', {content: content});
	});

});




app.listen(port, function() {
	console.log('Server running on port ' + port);
});