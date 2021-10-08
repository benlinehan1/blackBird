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

function getAllConsultations(relationship_id) {
	return axios.get(`http://localhost:3000/api/consultations/${relationship_id}`).then((res) => {
		return res.data;
	});
}

export default getAllConsultations;
