const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {});
};

const decodeJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = { generateJWT, decodeJWT, randomNumber };
