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

export function getSectionsByConsultation(consultation_id) {
	return axios
		.get(`http://localhost:3000/api/section/${consultation_id}`)
		.then((res) => {
			console.log(res.data);

			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}
