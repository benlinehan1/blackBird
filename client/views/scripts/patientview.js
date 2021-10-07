import component from "./../../lib/cmpParse.js";
const consultationDiv = document.querySelector(".consultations");
const sideBar = document.querySelector(".sidebar");

var modal = new tingle.modal({
	stickyFooter: false,
	closeMethods: ["overlay", "button", "escape"],
	closeLabel: "Close",
	cssClass: ["custom-class-1", "custom-class-2"],
	onOpen: function () {
		console.log("modal open");
	},
	onClose: function () {
		console.log("modal closed");
	},
	beforeClose: function () {
		// here's goes some logic
		// e.g. save content before closing the modal
		return true; // close the modal
		return false; // nothing happens
	},
});

component("ConsultationLink", {}, 0).then((comp) => {
	comp.classList.add("component");
	comp.classList.add("consultation_link");
	comp.classList.add("rounded");
	comp.addEventListener("click", (e) => {
		component("PatientBaseConsult", {}, 1).then((comp) => {
			comp.classList.add("component");
			comp.classList.add("doctor_selector");
			component("PatientSection", {}, 1).then((comp2) => {
				comp.appendChild(comp2);
				console.log(comp.innerHTML);
				modal.setContent(comp.innerHTML);
			});
		});
		modal.open();
	});
	consultationDiv.appendChild(comp);
	return;
});

//---------------------------------------------------------------------------------------------

component("DoctorSelector", {}, 1).then((comp) => {
	comp.classList.add("doctor_selector");
	sideBar.appendChild(comp);
	return;
});

component("DoctorSelector", {}, 2).then((comp) => {
	comp.classList.add("doctor_selector");
	sideBar.appendChild(comp);
	return;
});

component("DoctorSelector", {}, 3).then((comp) => {
	comp.classList.add("doctor_selector");
	sideBar.appendChild(comp);
	return;
});
