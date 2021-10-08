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
const { confirmationCode } = require("./lib/confirmationCode");

//Server config
const path = require("path");
const { email } = require("./lib/emailSend");
const app = express();
const port = process.env.PORT || serverLog.port; // Default port is 3000

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
						patientsModel.patientCreate(req.oidc.user.sub, res.name);
						res.redirect("/patientview");
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
	res.json({ status: "success" });
});

app.get("/api/relationships", (req, res) => {
	relationshipsModel.all(req.params.doctor_id, req.params.patient_id).then((dbRes) => {
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
app.get("/api/relationships/doctor/:patientId", (req, res) => {
	relationshipsModel.getAllDoctorsOfPatients(req.params.patientId).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.get("/api/relationships/patient/:patientId", (req, res) => {
	relationshipsModel.getAllPatientsOfDoctors(req.params.patientId).then((dbRes) => {
		res.json({ message: dbRes }).catch((err) => {
			console.log(err);
		});
	});
});
app.get("/api/relationships/pending/:doctorId", (req, res) => {
	relationshipsModel.getAllPendingPatients(req.params.doctorId).then((dbRes) => {
		console.log(dbRes);
		console.log(req.params.doctorId);
		res.json({ message: dbRes }).catch((err) => {
			console.log(err);
		});
	});
});
app.get("/api/relationships/confirmed/:doctorId", (req, res) => {
	relationshipsModel.getAllConfirmedPatients(req.params.doctorId).then((dbRes) => {
		console.log(dbRes);
		console.log(req.params.doctorId);
		res.json({ message: dbRes }).catch((err) => {
			console.log(err);
		});
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
	doctorModel.doctorGetAllById(req.params.id).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

// ^ gets doctor by id

app.get("/api/currentuser", (req, res) => {
	if (req.oidc.isAuthenticated()) {
		currentuser_id = req.oidc.user.sub;

		res.json({ user_id: currentuser_id });
	} else {
		res.json({ user_id: "log in error" });
	}
});

app.get("/api/patients", (req, res) => {
	patientsModel.patientsGetAll().then((dbRes) => {
		res.json({ message: dbRes });
	});
});

// ^ find all patients

app.get("/api/patients/:id", (req, res) => {
	patientsModel.patientsGetId(req.params.patientId).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

// find patient by id ^

app.get("/api/consultations/:id", (req, res) => {
	let relationship_id = req.params.id;

	consultationModel.getAllConsultations(relationship_id).then((dbRes) => {
		res.json({ consultations: dbRes });
	});
});

app.get("/api/search/consultations", (req, res) => {
	let patient_id = req.query.patient_id;
	let doctor_id = req.query.doctor_id;

	consultationModel.getConsultationByPatientId(patient_id, doctor_id).then((dbRes) => {
		res.json({ consultations: dbRes });
	});
});

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

app.patch("/api/section", (req, res) => {
	sectionModel.sectionPatch(req.body.consultation_id, req.body.title, req, body.content).then((dbRes) => {
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

app.get("/api/commentsBySection", (req, res) => {
	const { consultationId, sectionId } = req.query;
	commentsModel.getBySectionAndConsultation(consultationId, sectionId).then((response) => {
		res.json({ results: response });
	});
});

app.post("/api/comments", (req, res) => {
	commentsModel.commentsCreate(req.body.patientId, req.body.consultationId, req.body.content).then((dbRes) => {
		res.json({ message: dbRes });
	});
});

app.post("/api/email/:email/:doctor_id", (req, res) => {
	let confirmation_code = confirmationCode();

	email(req.params.email, confirmation_code).then((response) => {
		console.log(response);
		res.json({ message: "Email requested. Please allow 24 hours." });
	});
	confirmationModel.confirmationCreate(req.params.doctor_id, confirmation_code);
});

app.patch("/api/confirmrelationship/:code", (req, res) => {
	if (req.oidc.isAuthenticated()) {
		// currentuser_id = req.oidc.user.sub();
		let currentuser_id = req.oidc.user.sub();

		let confirmation_code = req.params.code;

		confirmationModel.confirmationGetByConfId(confirmation_code).then((dbRes) => {
			console.log(dbRes);
			var doctor_id = dbRes[0].doctor_id;
			console.log(doctor_id);
			relationshipsModel.confirm(doctor_id).then((dbRes) => {
				// confirmationModel.confirmationDeleteByConfId(dbRes.rows[0])
				dbRes;
				confirmationModel.confirmationDeleteByConfId(confirmation_code).then((dbRes) => {
					res.json({ message: "confirmed delete" });
				});
			});
		});
	} else {
		res.json({ message: "no" });
	}
});

/* --- SERVER LISTEN --- */
app.listen(port, (_) => serverLog.startup(port));
