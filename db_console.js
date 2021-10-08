const { timeStamp } = require("console");
const { default: axios } = require("axios");
const confirmation = require("./server/models/confirmation_models.js");
const comment = require("./server/models/comments_models.js");
const consultation = require("./server/models/consultation_models.js");
const doctor = require("./server/models/doctor_models.js");
const patient = require("./server/models/patients_models.js");
const relationship = require("./server/models/relationships_models.js");
const section = require("./server/models/section_models.js");

function sendConfCode(doctor_id, patient_email) {
	axios
		.post(`http://localhost:3000/api/email/${patient_email}/${doctor_id}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

sendConfCode("1", "nicolasngj@gmail.com");

// let doctorId = 2;
// let code = 92112037;
// let done = "doc";
// relationship.create("1", "2").catch((err) => {
// 	console.log(err);
// });
// relationship.all();

// section.sectionCreate(2, "Life must go on", "You're surely fine");

// doctor.doctorCreate("2", "Sarah Leah", "Psychiatrist", 2);

// patient.patientCreate("10", "Shakira");

// consultation.create("consultation", 4);
