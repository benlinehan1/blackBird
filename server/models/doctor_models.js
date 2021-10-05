// const dbquery = require("../lib/dbQuery.js");
const { Pool } = require("pg");
const db = new Pool({
	database: "blackbird",
	password: "test",
});

function doctorGetAllById(id) {
	let sql = "select * from doctors where id = $1;";
	return db.query(sql, [id]);
}
function doctorGetAll() {
	let sql = "select * from doctors;";
	return db.query(sql);
}
function doctorCreate(id, fullName, type, credentials) {
	let sql = "insert into doctors (id, full_name, type, credentials) values ($1,$2,$3,$4);";
	return db.query(sql, [id, fullName, type, credentials]);
}
module.exports = {
	doctorGetAll,
	doctorGetAllById,
	doctorCreate,
};
