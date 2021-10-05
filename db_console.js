const test = require("./server/models/comments_models.js");

let id = 1;
let pt = 2;
let content = "Melhorou";

test.commentsCreate(id, pt, content);
console.log(test.commentsGetAllByConsultation(2));
