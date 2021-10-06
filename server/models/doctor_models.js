const { dbQuery } = require("../lib/dbQuery.js");

function doctorGetAllById(id) {
	//  it is working but just remember the ID is text not integer
	let sql = "select * from doctors where id = $1;";
	return dbQuery(sql, [id])
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}
function doctorGetAll() {
	let sql = "select * from doctors;";
	return dbQuery(sql)
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}
function doctorCreate(id, fullName, type, credentials) {
	let sql = "insert into doctors (id, full_name, type, credentials) values ($1,$2,$3,$4);";
	return dbQuery(sql, [id, fullName, type, credentials])
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}

module.exports = {
	doctorGetAll,
	doctorGetAllById,
	doctorCreate,
};
