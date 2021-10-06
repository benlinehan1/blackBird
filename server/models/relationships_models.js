const { dbQuery } = require("../lib/dbQuery.js");
const { deleteSingle } = require("./consultation_models.js");

function all() {
	let sql = `
	select * from relationships;`;

	return dbQuery(sql).then((dbRes) => {
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
	let pending = pending(id);

	if (pending === false) {
		console.log("in progress");
	} else {
		return (sql = `UPDATE relationships SET pending = '${pending}'`);
	}
}

function remove(id) {
	let sql = `delete from relationships where id = $1;`;

	return dbQuery(sql, [id]).then((dbRes) => {
		return dbRes.rows;
	});
}

module.exports = {
	all,
	create,
	pending,
	confirm,
	remove,
};
