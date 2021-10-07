function email(email, confirmation_code) {
	const sgMail = require("@sendgrid/mail");
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: `${email}`, // Change to your recipient
		from: "blackbirdandthreemusketeers@gmail.com", // Change to your verified sender
		subject: "Authorisation code",
		text: `${confirmation_code}`,
		html: ` This has been sent through BLACKBIRD email server
    Hey sweaty,

	Here's your authorisation code gorgeous xx
    `,
	};
	return sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});
}

module.exports = {
	email,
};
