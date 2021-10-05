// const dbquery = require("../lib/dbQuery.js");
const { Pool } = require("pg");
const db = new Pool({
	database: "blackbird",
	password: "test",
});

function patientsGetAll() {
	let sql = "select * from patients;";
	return db.query(sql);
}
function patientCreate(id, name) {
	let sql = "insert into patients (id, full_name) values ($1,$2);";
	return db.query(sql, [id, name]);
}
module.exports = {
	patientsGetAll,
	patientCreate,
};
