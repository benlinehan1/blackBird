function doctorSidebar(patient_id) {
    var patient_id = 1;

    return axios.get(`/api/relationships/patient/${patient_id}`).then((res) => {
        return res.data;
    })
}

export default doctorSidebar;