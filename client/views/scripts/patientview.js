import component from "./../../lib/cmpParse.js";

var sidebar = document.querySelector(".sidebar_patient");

component("DoctorUl", { Class: "consultation-form" }).then((comp) => {
	sidebar.appendChild(comp);
});
