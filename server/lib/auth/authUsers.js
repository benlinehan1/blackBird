const axios = require("axios").default;
const path = require("path");
var __dirname = path.resolve();
require("dotenv").config({ path: `${__dirname}/dev.env` });

function getMetaData(userId) {
	console.log(`User id: ${userId}`);
	var config = {
		method: "get",
		url: `https://dev-o2a5ilyv.us.auth0.com/api/v2/users/${userId}?include_fields=true&fields=user_metadata`,
		headers: {
			Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
		},
	};

	return axios(config)
		.then(function (response) {
			return response.data.user_metadata;
		})
		.catch(function (error) {
			console.log("nah fams");
		});
}
module.exports = {
	getMetaData,
};
