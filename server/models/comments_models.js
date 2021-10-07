const { dbQuery } = require("../lib/dbQuery.js");

function commentsGetAllByPatientIdAndConsultation(patient_id, consultation_id) {
	let sql = "select * from comment where patient_id = $1 and consultation_id = $2 returning *;";
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
	let sql = "select * from comment where consultation_id = $1 returning *;";
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
	let sql = "select * from comment where patient_id = $1 returning *;";
	return dbQuery(sql, [patient_id])
		.then((res) => {
			console.log(res);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}

function commentsCreate(patient_id, consultation_id, content, section_id) {
	let sql = "insert into comment (patient_id, consultation_id, content, section_id) values ($1,$2,$3,$4) returning *;";
	return dbQuery(sql, [patient_id, consultation_id, content, section_id])
		.then((res) => {
			console.log(res);
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
}
module.exports = {
	commentsGetAllByPatientIdAndConsultation,
	commentsGetAllByPatientId,
	commentsGetAllByConsultation,
	commentsCreate,
};
