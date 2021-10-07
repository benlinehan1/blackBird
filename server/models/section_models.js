const { dbQuery } = require("../lib/dbQuery.js");

function sectionCreate(consultationId, title, content) {
	let sql = "insert into section (consultation_id, title, content) values ($1,$2,$3);";
	return dbQuery(sql, [consultationId, title, content]);
}

function sectionPatch(consultation_id, title, content) {
	let sql = `UPDATE section SET title = $1, content = $2 WHERE consultation_id = $3`;

	return dbQuery(sql, [title, content, consultation_id]).then((dbRes) => {
		return dbRes.rows;
	});
}

function sectionGetByConsulId(consultationId) {
	let sql = "select * from section where consultation_id = $1;";
	return dbQuery(sql, [consultationId]);
}

module.exports = {
	sectionCreate,
	sectionGetByConsulId,
	sectionPatch,
};
