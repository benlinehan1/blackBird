const { Pool } = require("pg");
const db = new Pool({
	database: "database",
	password: "test",
});

exports.dbQuery = (sql, params) => {
	return db.query(sql, params);
};
