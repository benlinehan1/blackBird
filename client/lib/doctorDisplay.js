const axios = require("axios");

function userID() {
	// function is assync
	return axios.get("http://localhost:3000/api/currentuser").then((res) => {
		return res.data;
	});
}

function doctorAll() {
	// function is assync
	return axios.get("http://localhost:3000/api/doctors").then((res) => {
		console.log(res.data);
		return res.data;
	});
}

function doctorById() {
	return userID().then((id) => {
		return axios.get(`http://localhost:3000/api/doctors/${1}`).then((res) => {
			return res.data.message;
		});
	});
	// function is assync
}
//id.user_id have to change the interpolation to get the data from the api
doctorById().then((res) => {
	console.log(res);
});
