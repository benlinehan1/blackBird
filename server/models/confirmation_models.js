const { dbQuery } = require("../lib/dbQuery.js");
const date = require("../lib/dateHelp.js");

function confirmationCreate(doctorId, confirmation_code) {
	let sql = "insert into confirmation (doctor_id, date, confirmation_code) values ($1,$2,$3);";
	return dbQuery(sql, [doctorId, date.newISO(), confirmation_code])
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}

function confirmationDeleteByConfId(confirmationCode) {
	let sql = "delete from confirmation where confirmation_code = $1;";
	return dbQuery(sql, [confirmationCode])
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}
function confirmationGetByConfId(confirmationCode) {
	let sql = "select * from confirmation where confirmation_code = $1;";
	return dbQuery(sql, [confirmationCode])
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}

module.exports = {
	confirmationCreate,
	confirmationDeleteByConfId,
	confirmationGetByConfId,
};
