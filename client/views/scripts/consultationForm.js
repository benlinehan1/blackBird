import component from "./../../lib/cmpParse.js";

var addConsultDiv = document.querySelector(".add_consultation");

component("ConsultationForm", { Class: "consultation-form" }).then((comp) => {
	comp.addEventListener("sumbit", () => {
		console.log("hello");
	});

	addConsultDiv.appendChild(comp);
});

docu;
