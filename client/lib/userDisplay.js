const axios = require("axios");

function userID() {
	// function is assync
	return axios.get("http://localhost:3000/api/currentuser").then((res) => {
		return res.data;
	});
} // tested

function patientAll() {
	// function is assync
	return axios.get("http://localhost:3000/api/patients").then((res) => {
		console.log(res.data);
		return res.data;
	});
} // Tested

function patientById() {
	return userID().then((id) => {
		return axios.get(`http://localhost:3000/api/patients/${"1"}`).then((res) => {
			console.log(res.data.message);
			return res.data.message;
		});
	});
}

function truePatientById(doctor_id) {
	return axios.get(`http://localhost:3000/api/relationships/confirmed/${doctor_id}`).then((res) => {
		console.log(res);
		return res;
	});
}
//id.user_id have to change the interpolation to get the data from the api
patientById().then((res) => {
	console.log(res);
});
