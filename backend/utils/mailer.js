var nodemailer = require('nodemailer');
const constants = require('../constants');
const emailConfig = require('../constants/email');

const transporter = nodemailer.createTransport({
	host: emailConfig.HOST,
	port: emailConfig.PORT,
	secure: false,
	auth: {
		user: emailConfig.USER,
		pass: emailConfig.PASSWORD
	}
});

const sendEmail = async (email, subject, text) => {
	const mailOptions = {
		from: emailConfig.USER,
		to: email,
		subject: subject,
		text: text
	};

	if (constants.NODE_ENV !== 'DEVELOPMENT') {
		await transporter.sendMail(mailOptions);
	} else {
		console.log('\x1b[36m%s\x1b[0m', 'Verified Token: ' + verifiedtoken);
	}
};

module.exports = { sendEmail };
