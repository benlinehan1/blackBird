function email() {
	const sgMail = require("@sendgrid/mail");
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: "benjaminlinehan21@gmail.com", // Change to your recipient
		from: "blackbirdandthreemusketeers@gmail.com", // Change to your verified sender
		subject: "See you on Friday besty",
		text: "code",
		html: ` This has been sent through BLACKBIRD email server
    This is fun and fresh

    send your CV if you want to work for us
    `,
	};
	sgMail
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
