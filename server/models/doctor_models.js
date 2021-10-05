const { dbQuery } = require("../lib/dbQuery.js");

function doctorGetAllById(id) {
	let sql = "select * from doctors where id = $1;";
	return dbQuery(sql, [id]);
}
function doctorGetAll() {
	let sql = "select * from doctors;";
	return dbQuery(sql);
}
function doctorCreate(id, fullName, type, credentials) {
	let sql = "insert into doctors (id, full_name, type, credentials) values ($1,$2,$3,$4);";
	return dbQuery(sql, [id, fullName, type, credentials]);
}
module.exports = {
	doctorGetAll,
	doctorGetAllById,
	doctorCreate,
};
