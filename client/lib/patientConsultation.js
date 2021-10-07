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

function getAllConsultations() {
	return axios.get(`http://localhost:3000/api/consultations/${4}`).then((res) => {
		return res.data;
	});
}

export default getAllConsultations;
