var nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

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

	await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
