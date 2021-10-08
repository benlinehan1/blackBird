import component from "./../../lib/cmpParse.js";
import getAllConsultations from "./../../lib/doctorDisplay.js";
import truePatientById from "./../../lib/userDisplay.js";
import { getSectionsByConsultation } from "./../../lib/consultationFunc.js";
import { getCommentsBySection } from "./../../lib/commentsFunc.js";
const consultationDiv = document.querySelector(".consultations");
const sideBar = document.querySelector(".sidebar");
const adder = document.querySelector(".adder");
const addForm = document.querySelector(".add-confirm-form");
const addInput = document.querySelector(".add-confirm-input");
const addBtn = document.querySelector(".add-confirm-btn");

truePatientById().then((res) => {
	let patients = res.data.message;
	console.log(res);
	patients.forEach((patient) => {
		console.log(patient);
		component("PatientSelector", { name: patient.full_name }, 1).then((comp) => {
			comp.classList.add("patient_selector");
			sideBar.appendChild(comp);
		});
	});
});

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
function generateConsultations(doctor_id) {
	getAllConsultations(doctor_id).then((res) => {
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
							sections = sections.message;
							sections.forEach((section) => {
								component("DoctorSection", { title: section.title, content: section.content }, 1).then(
									(comp2) => {
										getCommentsBySection(consultation.id, section.id).then((res) => {
											console.log(res);
											if (true) {
												console.log("yes");
												let commentArea = sectionDiv.querySelector(".comment");
												//Add event listener to the button that updates the comment
												console.log(res.results[0].content);
												commentArea.textContent = res.results[0].content;
											} else {
												let commentArea = sectionDiv.querySelector(".comment");
												//Add button evenet listener to create a new comment\
												//becuse this else is ran if the comment does not exist
											}

											modal.setContent(comp.innerHTML);
										});
										sectionDiv.appendChild(comp2);
										modal.setContent(comp.innerHTML);
									}
								);
							});

							modal.open();
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
}
generateConsultations(1);
