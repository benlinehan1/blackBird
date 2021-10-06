const { dbQuery } = require("../lib/dbQuery.js");
const date = require("../lib/dateHelp.js");
let confirmationCode = () => {
	return Math.floor(Math.random() * 99999999).toString();
};

function confirmationCreate(doctorId) {
	let sql = "insert into confirmation (doctor_id, date, confirmation_code) values ($1,$2,$3);";
	return dbQuery(sql, [doctorId, date.newISO(), confirmationCode()]);
}

function confirmationDeleteByConfId(confirmationCode) {
	let sql = "delete from confirmation where confirmation_code = $1;";
	return dbQuery(sql, [confirmationCode]);
}
function confirmationGetByConfId(confirmationCode) {
	let sql = "select * from confirmation where confirmation_code = $1;";
	return dbQuery(sql, [confirmationCode]);
}

module.exports = {
	confirmationCreate,
	confirmationDeleteByConfId,
	confirmationGetByConfId,
};
