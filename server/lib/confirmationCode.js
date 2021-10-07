let confirmationCode = () => {
	return Math.floor(Math.random() * 99999999).toString();
};

module.exports = {
	confirmationCode,
};
