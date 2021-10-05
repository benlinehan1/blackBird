const { dbQuery } = require("../lib/dbQuery.js");

function patientsGetAll() {
	let sql = "select * from patients;";
	return dbQuery(sql);
}
function patientCreate(id, name) {
	let sql = "insert into patients (id, full_name) values ($1,$2);";
	return dbQuery(sql, [id, name]);
}
module.exports = {
	patientsGetAll,
	patientCreate,
};
