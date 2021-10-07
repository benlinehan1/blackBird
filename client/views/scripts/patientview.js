import component from "./../../lib/cmpParse.js";
import getAllConsultations from "./../../lib/patientConsultation.js";
import { getSectionsByConsultation } from "./../../lib/consultationFunc.js";
import { getCommentsBySection } from "./../../lib/commentsFunc.js";
const consultationDiv = document.querySelector(".consultations");
const sideBar = document.querySelector(".sidebar");

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
						sections = sections.message;
						sections.forEach((section) => {
							component("PatientSection", { title: section.title, content: section.content }, 1).then(
								(comp2) => {
									getCommentsBySection(consultation.id, section.id).then((res) => {
										if (res.results.length > 0) {
											console.log("yes");
											let commentArea = sectionDiv.querySelector("textarea");
											commentArea.innerText = res.results[0].content;
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

var modal = new tingle.modal({
	stickyFooter: false,
	closeMethods: ["overlay", "button", "escape"],
	closeLabel: "Close",
	cssClass: ["custom-class-1", "custom-class-2"],
	onOpen: function () {},
	onClose: function () {},
	beforeClose: function () {
		// here's goes some logic
		// e.g. save content before closing the modal
		return true; // close the modal
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
