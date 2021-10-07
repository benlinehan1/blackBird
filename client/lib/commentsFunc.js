export function getCommentsBySection(consultation_id, section_id) {
	return axios
		.get(`http://localhost:3000/api/commentsBySection?consultationId=${consultation_id}&sectionId=${section_id}`)
		.then((res) => {
			//console.log(res.data);
			console.log(res);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
}
