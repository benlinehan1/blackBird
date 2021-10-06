import component from "./../../lib/cmpParse.js";

// component("Heading", { VarName: "hello", text: "bye" }).then((comp) => {
// 	document.body.appendChild(comp);
// });

// component("HeadingInput", {})

// component("AddNewBtn", { Text: "Add new section" }).then((comp) => {
//     comp.addEventListener('click', () => {
//         console.log('hello')
//     })

// })

// component("Heading", { Title: "Hello World" }).then((comp) => {
// 	document.body.appendChild(comp);
// });

var addConsultDiv = document.querySelector(".add_consultation");

component("HPAddNewSection", { AddSecBtn: "Add new section" }).then((comp) => {
	comp.addEventListener("click", () => {
		let newSection = document.createElement("input");

		newSection.class = ".new_section";

		addConsultDiv.appendChild(newSection);
	});

	addConsultDiv.appendChild(comp);
});
