const { dbQuery } = require("../lib/dbQuery.js");

function commentsGetAllByPatientIdAndConsultation(patient_id, consultation_id) {
	let sql = "select * from comment where patient_id = $1 and consultation_id = $2;";
	return dbQuery(sql, [patient_id, consultation_id])
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}
function commentsGetAllByConsultation(consultation_id) {
	let sql = "select * from comment where consultation_id = $1;";
	return dbQuery(sql, [consultation_id])
		.then((res) => {
			console.log(res);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}
function commentsGetAllByPatientId(patient_id) {
	let sql = "select * from comment where patient_id = $1;";
	return dbQuery(sql, [patient_id])
		.then((res) => {
			console.log(res);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}

function commentsCreate(patient_id, consultation_id, content) {
	let sql = "insert into comment (patient_id, consultation_id, content) values ($1,$2,$3);";
	return dbQuery(sql, [patient_id, consultation_id, content])
		.then((res) => {
			console.log(res);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}
module.exports = {
	commentsGetAllByPatientIdAndConsultation,
	commentsGetAllByPatientId,
	commentsGetAllByConsultation,
	commentsCreate,
};
