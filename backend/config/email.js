require('dotenv/config');

module.exports = {
    HOST: process.env.EMAIL_HOST,
    PORT: process.env.EMAIL_PORT,
    USER: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
}