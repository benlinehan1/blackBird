const axios = require("axios");

function userID() {
	// function is assync
	return axios.get("http://localhost:3000/api/currentuser").then((res) => {
		return res.data;
	});
}
