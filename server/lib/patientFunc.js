const axios = require("axios");

function getPatientById() {
	axios
		.get("/api/patients/1")
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

getPatientById();
