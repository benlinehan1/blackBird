import component from "./../../lib/cmpParse.js";

var sidebarHp = document.querySelector(".sidebar_hp");

component("HpView", { Label: "Select a patient:" }).then((comp) => {
	sidebarHp.appendChild(comp);
});

var consultationDiv = document.querySelector(".consultations_hp");

component("HpBaseConsult", { Title: "Consultation", Date: "Placeholder" }).then((comp) => {
	consultationDiv.appendChild(comp);
});
