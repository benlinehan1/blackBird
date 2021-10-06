const { timeStamp } = require("console");
const test = require("./server/models/confirmation_models.js");

let doctorId = 2;
let code = 4391853;

test.confirmationDeleteByConfId(code);
