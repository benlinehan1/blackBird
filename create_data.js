// //run this create data script to create data, probably best to clear the data  base first to aviod any conflicts
const { timeStamp } = require("console");
const confirmation = require("./server/models/confirmation_models.js");
const comment = require("./server/models/comments_models.js");
const consultation = require("./server/models/consultation_models.js");
const doctor = require("./server/models/doctor_models.js");
const patient = require("./server/models/patients_models.js");
const relationship = require("./server/models/relationships_models.js");
const section = require("./server/models/section_models.js");

//first block
patient.patientCreate("1", "Sarah");
patient.patientCreate("2", "Chris");
patient.patientCreate("3", "Sara");
patient.patientCreate("4", "Ben");

doctor.doctorCreate("1", "Dr. Isaac", "Psicologist", "0001");
doctor.doctorCreate("2", "Dr. John", "Psychotherapist", "0002");
doctor.doctorCreate("3", "Dr. Abeyewardene", "Pediatrician", "0003");
doctor.doctorCreate("4", "Dr. ChunLee", "Psychotherapist", "0004");

//We only want confirmation for relationships that dont exist
confirmation.confirmationCreate("1", "12345678");
confirmation.confirmationCreate("2", "12345678");
confirmation.confirmationCreate("3", "12345678");
confirmation.confirmationCreate("4", "12345678");

relationship.create("1", "1"); //id will be 1
relationship.create("2", "1"); //id will be 2
relationship.create("3", "1"); //id will be 3
relationship.create("2", "2"); //id will be 4
relationship.create("4", "2"); //id will be 5
relationship.create("3", "2"); //id will be 6
relationship.create("3", "3"); //id will be 7
relationship.create("4", "4"); //id will be 8
relationship.create("1", "4"); //id will be 9
// run second block

consultation.create("Dis a consultation", 1);
section.sectionCreate(1, "Section 1 of consultation 1");
comment.commentsCreate("1", 1, "comment for consultation 1 section 1");
section.sectionCreate(1, "Section 2 of consultation 1");

consultation.create("Bro why you so depressed?", 1);
section.sectionCreate(2, "Section 1 of consultation 2");
comment.commentsCreate("1", 2, "comment for consultation 2 section 1");
section.sectionCreate(2, "Section 2 of consultation 2");

consultation.create("Lol nvm figured out why, you ugly as hell", 1);
section.sectionCreate(2, "Section 1 of consultation 2");
comment.commentsCreate("1", 3, "comment for consultation 3 section 2");
section.sectionCreate(2, "Section 2 of consultation 2");

consultation.create("Id be depressed too if I looked like that", 1);
section.sectionCreate(3, "Section 1 of consultation 3");
comment.commentsCreate("1", 4, "comment for consultation 4 section 2");
section.sectionCreate(3, "Section 2 of consultation 3");

consultation.create("another consultation", 2);
section.sectionCreate(4, "Section 1 of consultation 4");
section.sectionCreate(4, "Section 2 of consultation 4");
consultation.create("kanye 2024", 2);
section.sectionCreate(5, "Section 1 of consultation 5");
section.sectionCreate(5, "Section 2 of consultation 5");

consultation.create("Therapy session", 3);
section.sectionCreate(6, "Section 1 of consultation 6");
section.sectionCreate(6, "Section 2 of consultation 6");

consultation.create("Another therapy session", 3);
section.sectionCreate(7, "Section 1 of consultation 7");
section.sectionCreate(7, "Section 2 of consultation 7");

consultation.create("Last therapy session, you too boring", 3);
section.sectionCreate(8, "Section 1 of consultation 8");
section.sectionCreate(8, "Section 2 of consultation 8");

consultation.create("Therapy session #1", 4);
section.sectionCreate(9, "Section 1 of consultation 9");
section.sectionCreate(9, "Section 2 of consultation 9");

consultation.create("Therapy session #2", 4);
section.sectionCreate(10, "Section 1 of consultation 10");
section.sectionCreate(10, "Section 2 of consultation 10");

consultation.create("Therapy session #3", 4);
section.sectionCreate(11, "Section 1 of consultation 11");
section.sectionCreate(11, "Section 2 of consultation 11");

consultation.create("Therapy session #111", 5);
section.sectionCreate(12, "Section 1 of consultation 12");
section.sectionCreate(12, "Section 2 of consultation 12");

consultation.create("Therapy session #222", 5);
section.sectionCreate(13, "Section 1 of consultation 13");
section.sectionCreate(13, "Section 2 of consultation 13");

consultation.create("Therapy session #322", 5);
section.sectionCreate(14, "Section 1 of consultation 14");
section.sectionCreate(14, "Section 2 of consultation 14");

consultation.create("Therapy session #1111111", 5);
section.sectionCreate(15, "Section 1 of consultation 15");
section.sectionCreate(15, "Section 2 of consultation 15");

consultation.create("Therapy session #2222222", 5);
section.sectionCreate(16, "Section 1 of consultation 16");
section.sectionCreate(16, "Section 2 of consultation 16");

consultation.create("Therapy session #3222222", 5);
section.sectionCreate(17, "Section 1 of consultation 17");
section.sectionCreate(17, "Section 2 of consultation 17");
