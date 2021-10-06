import component from "./../../lib/cmpParse.js";

component("HPAddNewSection", { AddSecBtn: "Add new section" }).then((comp) => {
	comp.addEventListener("click", () => {
		let newSection = document.createElement("input");

		newSection.class = ".new_section";

		document.body.appendChild(newSection);
	});

	document.body.appendChild(comp);
});

component("PatientBaseConsult", { Title: "Consultation", Date: "Placeholder" }).then((comp) => {
	document.body.appendChild(comp);
});

component("HpView", { Label: "Select a patient:" }).then((comp) => {
	document.body.appendChild(comp);
});

component("HpBaseConsult", { Title: "Consultation", Date: "Placeholder" }).then((comp) => {
	document.body.appendChild(comp);
});

component("ConsultationForm", { Class: "consultation-form" }).then((comp) => {
	comp.addEventListener("sumbit", () => {
		console.log("hello");
	});

	document.body.appendChild(comp);
});

component("Section", {}).then((comp) => {
	document.body.appendChild(document.body);
});
