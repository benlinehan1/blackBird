const { Pool } = require("pg");
const db = new Pool({
	database: "blackbird",
	password: "test",
});

exports.dbQuery = (sql, params) => {
	return db.query(sql, params);
};
