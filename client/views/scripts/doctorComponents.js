import component from "./../../lib/cmpParse.js";
const consultationDiv = document.querySelector(".consultations");

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
		modal.open();
	});
	consultationDiv.appendChild(comp);
	return;
});
