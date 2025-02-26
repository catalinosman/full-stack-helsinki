require("dotenv").config();

console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3003;

module.exports = { MONGODB_URI, PORT };
