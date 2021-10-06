const express = require("express");
const serverLog = require("./lib/serverLog");
const statusCodes = require("./lib/statusCodes");
require("dotenv").config({ path: `${__dirname}/dev.env` });
const signUpHelp = require("./lib/auth/signUp");
const authUsersHelp = require("./lib/auth/authUsers");
const { auth } = require("express-openid-connect");

//Import models
const commentsModel = require("./models/comments_models");
const confirmationModel = require("./models/confirmation_models");
const consultationModel = require("./models/consultation_models");
const doctorModel = require("./models/doctor_models");
const patientsModel = require("./models/patients_models");
const relationshipsModel = require("./models/relationships_models");
const sectionModel = require("./models/section_models");

//Server config
const path = require("path");
const app = express();
const port = serverLog.port; // Default port is 3000

app.use(
	auth({
		auth0Logout: true,
		issuerBaseURL: process.env.ISSUER_BASE_URL,
		baseURL: process.env.BASE_URL,
		clientID: process.env.CLIENT_ID,
		secret: process.env.SECRET,
		authRequired: false,
	})
);

app.use(express.static("client")); //Serves our static files used for the client
app.use(express.json()); //Allows us to respond with JSON
app.use(serverLog.sMsg.req); //Automatically sends messages to the console

/* --- ROUTES --- */
app.get("/", (req, res) => {
	//check if logged in
	console.log(req.oidc.isAuthenticated());
	if (req.oidc.isAuthenticated()) {
		console.log(req.oidc.user);
		let userId = req.oidc.user.sub;
		signUpHelp.isFirstSignUp(userId).then((res) => {
			if (res) {
				authUsersHelp.getMetaData(userId).then((res) => {
					if (res.role === "patient") {
						patientsModel.patientsCreate(req.oidc.user.sub, res.name);
						res.redirect("/pateintview");
					} else if (res.role === "doctor") {
						doctorsModel.doctorCreate(req.oidc.user.sub, res.name);
						res.redirect("hpview");
					}
				});
			}
		});
		res.redirect("/home");
	} else {
		res.redirect("/login");
	}
});

app.get("/addconsultation", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/addconsultation.html"));
});

app.get("/patientview", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/patientview.html"));
});

app.get("/hpview", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/hpview.html"));
});

app.get("/landing", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/landing.html"));
});

app.get("/callback", (req, res) => {
	console.log(req.oidc);
	res.send("logged in");
});

app.get("/home", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/home.html"));
});

/* --- API ROUTES --- */
app.get("/api/", (req, res) => {
	res.json(statusCodes.success());
});

app.get("/api/relationships", (req, res) => {
	relationshipsModel.all().then((dbRes) => {
		res.json({ message: dbRes }).catch((err) => {
			res.json({ message: err.message });
		});
	});
});

app.post("/api/relationships", (req, res) => {
	req.body;

	console.log(req.body);

	relationshipsModel.create(req.body.patient_id, req.body.doctor_id).then((dbRes) => {
		console.log(dbRes);
		res.json({ message: "added", relationship: dbRes });
	});
});

app.delete("/api/relationships/:id", (req, res) => {
	relationshipsModel
		.remove(req.params.id)
		.then((dbRes) => {
			res.json("confirmed delete");
		})
		.catch((err) => {
			res.status(500).json("error occurred");
		});
});

/* --- SERVER LISTEN --- */
app.listen(port, (_) => serverLog.startup(port));
