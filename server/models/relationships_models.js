const { dbQuery } = require("../lib/dbQuery.js");
const { deleteSingle } = require("./consultation_models.js");

function all(doctor_id, patient_id) {
	let sql = `
	select * from relationships WHERE doctor_id = $1 AND patient_id = $2;`;

	return dbQuery(sql, [doctor_id, patient_id]).then((dbRes) => {
		console.log(dbRes.rows);
		return dbRes.rows;
	});
}

function create(patient_id, doctor_id) {
	let sql = `INSERT INTO relationships (patient_id, doctor_id) values ($1, $2) returning *`;

	return dbQuery(sql, [patient_id, doctor_id]).then((dbRes) => {
		console.log(dbRes.rows[0]);
		return dbRes.rows[0];
	});
}

function pending(id) {
	let sql = `SELECT pending FROM relationships WHERE id = $1;`;

	return dbQuery(sql, [id]).then((dbRes) => {
		return dbRes.rows[0];
	});
}

function confirm(id) {
	id = id.toString();

	console.log(`This is the` + id);
	let sql = `UPDATE relationships SET pending = true WHERE doctor_id = $1 returning *`;

	return dbQuery(sql, [id]).then((dbRes) => {
		console.log(dbRes);
		return dbRes.rows[0];
	});
}

function remove(id) {
	let sql = `delete from relationships where id = $1;`;

	return dbQuery(sql, [id])
		.then((dbRes) => {
			return dbRes.rows;
		})
		.catch((err) => {
			console.log(err);
		});
}
function getAllDoctorsOfPatients(patient_id) {
	let sql = `select doctors.* from relationships join doctors on relationships.doctor_id = doctors.id where (patient_id = $1 and pending = false)`;

	return dbQuery(sql, [patient_id])
		.then((dbRes) => {
			return dbRes.rows;
		})
		.catch((res) => {
			console.log(res);
		});
}

function getAllPatientsOfDoctors(patient_id) {
	let sql = `select patients.* from relationships join patients on relationships.patient_id = patients.id where (patient_id = $1 and pending = false)`;

	return dbQuery(sql, [patient_id]).then((dbRes) => {
		return dbRes.rows;
	});
}

function getStatus(id) {
	let sql = `SELECT pending from relationships where id = $1`;
}

function getAllPendingPatients(doctor_id) {
	let sql = `select patients.* from relationships join patients on relationships.patient_id = patients.id where (doctor_id = $1 and pending = true)`;
	return dbQuery(sql, [doctor_id])
		.then((dbRes) => {
			return dbRes.rows;
		})
		.catch((err) => {
			console.log(err);
		});
}

function getAllConfirmedPatients(doctor_id) {
	let sql = `select patients.* from relationships join patients on relationships.patient_id = patients.id where (doctor_id = $1 and pending = false)`;
	return dbQuery(sql, [doctor_id])
		.then((dbRes) => {
			return dbRes.rows;
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = {
	all,
	create,
	pending,
	confirm,
	remove,
	getAllPendingPatients,
	getAllPatientsOfDoctors,
	getAllDoctorsOfPatients,
	getAllConfirmedPatients,
};
