const { dbquery, dbQuery } = require("../lib/dbQuery.js");
const dateHelp = require("../lib/dateHelp");

function create(title, relationship_id) {
	let sql = "INSERT INTO consultation (date, title, relationship_id) VALUES ($1, $2, $3)";
	let date = dateHelp.newISO();

	return dbQuery(sql, [date, title, relationship_id])
		.then((res) => {
			return res.rows();
		})
		.catch((err) => {
			console.log("you done fucked up");
		});
}

//probs a good idea to make sure that we double check if it is the right user requesting the delet, you know for security reasons
//but that will probably be done on the actual api endpoint
function deleteSingle(consultationId) {
	if (consultationId.length > 1) {
		//check that a id is actually passed in cause I feel like people could do some weird shit
		//and delete everything which would suck
		let sql = "DELETE FROM consultation WHERE id = $1";

		return dbQuery(sql[consultationId]).then((res) => {
			return res.rows();
		});
	} else {
		return false;
	}
}

function getWithSections(id) {
	let getModelSql = "SELECT * from consultation WHERE id = $1";
	let getSectionsSql =
		"SELECT * from section INNER JOIN comments ON section.id = comment.section_id WHERE section.consultation_id = $1";
	let returnObject = {};

	return dbQuery(getModelSql, [id]).then((res) => {
		returnObject.consultation = res.rows();
	});
}
