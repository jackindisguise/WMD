// npm includes
const express = require("express");
const cookie = require("cookie-parser");
const path = require("path");
const bodyParser = require('body-parser');
const session = require("express-session")({
	secret: "kickEEwinTI",
    resave: true,
    saveUninitialized: true
});

// local includes
const _package = require("../../../package.json");

// configure the express app
let app = express();
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../../www/public')));
app.use(cookie());
app.set("view engine", "pug");
app.set("views", "./www/pug/page");
app.locals.pretty = true;

// index page
app.get("/", function(req, res) {
	res.render('index', {_package:_package, session:req.session});
});

app.get("*", function(req,res){
	res.redirect("/");
});

// configure HTTP server to go through express app and socket.io
let server = require("http").Server(app);
let io = require("socket.io")(server,{
	pingTimeout:5000,
	pingInterval:5000
});

// add session to socket.io socket
/*io.use(function(socket, next) {
    session(socket.request, socket.request.res, next);
});*/

/**
 * @namespace
 */
let Web = {
	/**
	 * HTTP Server configured for use with express app and socket.io.
	 * @type {server}
	 */
	server:server,

	/**
	 * Express app instance.
	 * @type {app}
	 */
	app:app,

	/**
	 * Socket.IO front end.
	 * @type {SocketIO}
	 */
	io:io
};

module.exports = Web;
