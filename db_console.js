const test = require("./server/models/patients_models.js");

let id = 1;
let name = "nick";
let content = "Melhorou";
test.patientCreate(id, name);
console.log(test.patientsGetAll());
