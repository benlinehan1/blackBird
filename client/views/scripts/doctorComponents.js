import component from "./../../lib/cmpParse.js";
import getAllConsultations from "./../../lib/doctorDisplay.js";
const consultationDiv = document.querySelector(".consultations");
const sideBar = document.querySelector(".sidebar");
const adder = document.querySelector(".adder");

getAllConsultations().then((res) => {
	let consultations = res.consultations;

	consultations.forEach((consultation) => {
		component("ConsultationLink", { title: consultation.title, date: consultation.date }, 0).then((comp) => {
			comp.classList.add("component");
			comp.classList.add("consultation_link");
			comp.classList.add("rounded");
			comp.addEventListener("click", (e) => {
				modal.open();
			});
			consultationDiv.appendChild(comp);
			return;
		});
	});
});

adder.addEventListener("click", () => {
	adderModal.open();
});

var adderModal = new tingle.modal({
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

//-------------------------------------------------------------------------------------------------------------

component("PatientSelector", {}, 1).then((comp) => {
	comp.classList.add("patient_selector");
	sideBar.appendChild(comp);
	return;
});
