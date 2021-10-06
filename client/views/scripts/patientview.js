import component from "./../../lib/cmpParse.js";
const consultationDiv = document.querySelector(".consultations_hp");

component("ConsultationLink", {}, 0).then((comp) => {
	comp.classList.add("component");
	comp.classList.add("consultation_link");
	comp.classList.add("rounded");
	consultationDiv.appendChild(comp);
	return;
});

component("ConsultationLink", {}, 1).then((comp) => {
	comp.classList.add("component");
	comp.classList.add("consultation_link");
	comp.classList.add("rounded");
	consultationDiv.appendChild(comp);
	return;
});

component("ConsultationLink", {}, 3).then((comp) => {
	comp.classList.add("component");
	comp.classList.add("consultation_link");
	comp.classList.add("rounded");
	consultationDiv.appendChild(comp);
	return;
});
