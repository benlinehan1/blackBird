const expireHours = 2;

//This returns us the current date in the format of
function newISO() {
	return new Date().toISOString();
}

function newISOWithExpire() {
	new Date(new Date().getTime() + expireHours * 60 * 60 * 1000);
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
	newISOWithExpire,
};
