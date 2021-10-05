const express = require("express");
const serverLog = require("./lib/serverLog");
const statusCodes = require("./lib/statusCodes");
require("dotenv").config({ path: `${__dirname}/dev.env` });

const path = require("path");
const app = express();
const port = serverLog.port; // Default port is 3000

const { auth } = require("express-openid-connect");
app.use(
	auth({
		issuerBaseURL: process.env.ISSUER_BASE_URL,
		baseURL: process.env.BASE_URL,
		clientID: process.env.CLIENT_ID,
		secret: process.env.SECRET,
	})
);

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

app.get("/callback", (req, res) => {
	res.send("logged in");
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
