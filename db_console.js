const test = require("./server/models/patients_models.js");

let id = 1;
let name = "Nic";

test.create(id, name);
console.log(test.getAll());
