//This returns us the current date in the format of
function newISO() {
	return new Date().toISOString();
}

function formateDate(date) {
	return date.toLocaleDateString("en-gb", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "AEDT",
	});
}

module.exports = {
	newISO,
	formateDate,
};
