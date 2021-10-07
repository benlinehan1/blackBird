const { timeStamp } = require("console");
const confirmation = require("./server/models/confirmation_models.js");
const comment = require("./server/models/comments_models.js");
const consultation = require("./server/models/consultation_models.js");
const doctor = require("./server/models/doctor_models.js");
const patient = require("./server/models/patients_models.js");
const relationship = require("./server/models/relationships_models.js");
const section = require("./server/models/section_models.js");

// let doctorId = 2;
// let code = 92112037;
// let done = "doc";
// relationship.create("1", "2").catch((err) => {
// 	console.log(err);
// });
// relationship.all();

// section.sectionCreate(2, "Life must go on", "You're surely fine");

// doctor.doctorCreate("2", "Sarah Leah", "Psychiatrist", 2);

patient.patientCreate("10", "Shakira");

// consultation.create("consultation", 4);
