function sendConfCode(doctor_id, patient_email) {
	axios
		.post(`http://localhost:3000/api/email/${patient_email}/${doctor_id}`)
		.then((res) => {
			//console.log(res.data);
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

export default sendConfCode;
