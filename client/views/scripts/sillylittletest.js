import component from "./../../lib/cmpParse.js";

component("HPAddNewSection", { AddSecBtn: "Add new section" }).then((comp) => {
	comp.addEventListener("click", () => {
		comp.classList.add("component");

		let newSection = document.createElement("input");

		newSection.class = ".new_section";

		document.body.appendChild(newSection);
	});

	document.body.appendChild(comp);
});

component("PatientBaseConsult", { Title: "Consultation", Date: "Placeholder" }, 0).then((comp) => {
	comp.classList.add("component");
	comp.classList.add("consultation");
	comp.classList.add("rounded");
	document.body.appendChild(comp);
	return;
});

component("HpView", { Label: "Select a patient:" }, 1).then((comp) => {
	comp.classList.add("component");
	document.body.appendChild(comp);
	return;
});

component("HpBaseConsult", { Title: "Consultation", Date: "Placeholder" }, 2).then((comp) => {
	comp.classList.add("component");
	document.body.appendChild(comp);
	return;
});

component("ConsultationForm", { Class: "consultation-form" }, 3).then((comp) => {
	comp.classList.add("component");
	comp.addEventListener("sumbit", () => {
		console.log("hello");
	});

	document.body.appendChild(comp);
	return;
});

component("Section", {}, 4).then((comp) => {
	comp.classList.add("component");
	document.body.appendChild(comp);
	return;
});

component("DoctorSelector", {}, 5).then((comp) => {
	comp.classList.add("component");
	comp.classList.add("doctorSelector");
	document.body.appendChild(comp);
	return;
});
