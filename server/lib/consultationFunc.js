const axios = require("axios");

function getSingleConsultation() {
	axios
		.get(`http://localhost:3000/api/consultation/${relationship_id}`)
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
		.get(`http://localhost:3000/api/section/${consultation_id}`)
		.then((res) => {
			console.log(res.data);

			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}
