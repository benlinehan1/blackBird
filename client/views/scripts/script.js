import component from "./../../lib/cmpParse.js";

component("HPAddCon", {});

component("Heading", { VarName: "hello", text: "bye" }).then((comp) => {
	document.body.appendChild(comp);
});
