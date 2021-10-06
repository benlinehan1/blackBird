component = (cmpFile, locals = {}) => {
	let parentDiv = document.createElement("div");
	return fetch("./components/" + cmpFile + ".cmp")
		.then((response) => response.text())
		.then((innerHtml) => {
			let array = innerHtml.split(/{|}/);

			array = array.map((e) => {
				if (e[0] == ":") {
					let replace = locals[e.replace(":", "")];

					if (replace) return replace;
					else throw `No varible of "${e.replace(":", "")}" in locals of "${cmpFile}"`;
				} else {
					return e;
				}
			});

			parentDiv.innerHTML = array.join("");
			return parentDiv;
		});
};

export default component;
