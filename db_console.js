const test = require("./server/models/patients_models.js");

let id = 1;
let pt = 2;
let content = "Melhorou";
console.log(test.patientsGetAll());
test.console.log(test.commentsGetAllByConsultation(2));
