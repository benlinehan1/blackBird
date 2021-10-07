import component from "./../../lib/cmpParse.js";
import getAllConsultations from "./../../lib/patientConsultation.js";
import { getSectionsByConsultation } from "./../../lib/consultationFunc.js";
const consultationDiv = document.querySelector(".consultations");
const sideBar = document.querySelector(".sidebar");

//We need to create a seed file desperatly

//-------------------
//ALSO NEED TO CHUCK THIS ENTIRE THING INTO A FUNCTION SO WE CAN CALL IT WHHEN WE WANT TO DO
//----------------
getAllConsultations().then((res) => {
	// console.log(res.consultations);
	let consultations = res.consultations;

	consultations.forEach((consultation) => {
		component("ConsultationLink", { title: consultation.title, date: consultation.date }, 0).then((comp) => {
			comp.classList.add("component");
			comp.classList.add("consultation_link");
			comp.classList.add("rounded");
			comp.addEventListener("click", (e) => {
				component("PatientBaseConsult", {}, 1).then((comp) => {
					getSectionsByConsultation(consultation.id).then((sections) => {
						let sectionDiv = comp.querySelector(".section");
						console.log(sectionDiv);
						sections = sections.message;
						sections.forEach((section) => {
							console.log(section);
							component("PatientSection", { title: section.title, content: section.content }, 1).then(
								(comp2) => {
									console.log("append");
									sectionDiv.appendChild(comp2);
									modal.setContent(comp.innerHTML);
								}
							);
						});

						modal.open();
						console.log(modal.getContent().innerHTML);
					});
					comp.classList.add("component");
					comp.classList.add("doctor_selector");
				});
			});
			consultationDiv.appendChild(comp);
			return;
		});
	});
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

//---------------------------------------------------------------------------------------------

//Do the same thing you did here before nick
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
