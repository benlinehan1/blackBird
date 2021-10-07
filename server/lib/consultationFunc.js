const axios = require("axios");

function getSingleConsultation() {
	axios
		.get(`http://localhost:3000/api/consultation/1`)
		.then((res) => {
			console.log(res.data);

			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

function getSectionByConsultation() {
	axios
		.get(`http://localhost:3000/api/section/1`)
		.then((res) => {
			console.log(res.data);

			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}
