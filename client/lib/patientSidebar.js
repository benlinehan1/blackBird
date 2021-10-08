function patientSidebar(patient_id) {
	var patient_id = 4;

	return axios.get(`/api/relationships/doctor/${patient_id}`).then((res) => {
		console.log(res.data);
		return res.data;
	});
}

export default patientSidebar;
