const express = require("express");
const serverLog = require("./lib/serverLog");
const statusCodes = require("./lib/statusCodes");

var path = require("path");

const app = express();
const port = serverLog.port; // Default port is 3000

app.use(express.static("client")); //Serves our static files used for the client
app.use(express.json()); //Allows us to respond with JSON
app.use(serverLog.sMsg.req); //Automatically sends messages to the console

/* --- ROUTES --- */
app.get("/", (req, res) => {
	res.send("Working");
});

app.get("/landing", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/landing.html"));
});

app.get("/home", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/home.html"));
});

/* --- API ROUTES --- */
app.get("/api/", (req, res) => {
	res.json(statusCodes.success());
});

/* --- SERVER LISTEN --- */
app.listen(port, (_) => serverLog.startup(port));
