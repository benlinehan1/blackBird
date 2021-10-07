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

app.get("/sillylittletest", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/sillylittletest.html"));
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
		res.json({ message: dbRes });
	});
});

// ^ requests all relationships

app.post("/api/relationships", (req, res) => {
	req.body;

	console.log(req.body);

	relationshipsModel.create(req.body.patientId, req.body.doctor_id).then((dbRes) => {
		console.log(dbRes);
		res.json({ message: "added", relationship: dbRes });
	});
});

//^ adds relationship

app.delete("/api/relationships/:id", (req, res) => {
	relationshipsModel.remove(req.params.id).then((dbRes) => {
		res.json("confirmed delete");
	});
});

// DOCTOR MODELS:

app.get("/api/doctors", (req, res) => {
	doctorModel.doctorGetAll().then((dbRes) => {
		res.json({ message: dbRes });
	});
});

// return * doctors ^

app.get("/api/doctors/:id", (req, res) => {
	doctorModel.doctorGetAllById(req.body.doctorId).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

// ^ gets doctor by id

app.get("/api/currentuser", (req, res) => {
	if (req.oidc.isAuthenticated()) {
		currentuser_id = req.oidc.user.sub;

		res.json({ user_id: currentuser_id });
	} else {
		res.json({ message: "log in coward" });
	}
});

app.get("/api/patients", (req, res) => {
	patientsModel.patientsGetAll().then((dbRes) => {
		res.json({ message: dbRes });
	});
});

// ^ find all patients

app.get("/api/patients/:id", (req, res) => {
	patientsModel.patientsGetId(req.body.patientId).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

// find patient by id ^

app.get("/api/consultation/:id", (req, res) => {
	consultationModel.getSingle(req.params.id).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.get("/api/consultationsections/:id", (req, res) => {
	consultationModel.getSections(req.params.id).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.post("/api/consultations", (req, res) => {
	consultationModel.create(req.body.title, req.body.relationshipId).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.delete("/api/consultation/:id", (req, res) => {
	consultationModel.deleteSingle(req.params.id).then((dbRes) => {
		res.json({ message: "consultation deleted" });
	});
});

app.get("/api/section/:id", (req, res) => {
	sectionModel.sectionGetByConsulId(req.params.id).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.post("/api/section", (req, res) => {
	sectionModel.sectionCreate(req.body.consultationId, req.body.title, req.body.content).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.get("/api/confirmation/:code", (req, res) => {
	confirmationModel.confirmationGetByConfId(req.params.code).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.post("/api/confirmation", (req, res) => {
	confirmationModel.confirmationCreate(req.body.doctorId).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.delete("/api/confirmation/:code", (req, res) => {
	confirmationModel.confirmationDeleteByConfId(req.params.code).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.post("/api/comments", (req, res) => {
	commentsModel.commentsCreate(req.body.patientId, req.body.consultationId, req.body.content).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

/* --- SERVER LISTEN --- */
app.listen(port, (_) => serverLog.startup(port));
