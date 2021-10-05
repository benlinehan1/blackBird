const test = require("./server/models/doctor_models.js");

let id = 1;
let fullName = "Nic";
let type = "psic";
let credential = 1234;

test.doctorCreate(id, fullName, type, credential);
console.log(test.doctorGetAllById(1));
