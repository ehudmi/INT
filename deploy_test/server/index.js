const express = require("express");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { runDB } = require("./config/atlas");

const app = express();

dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.listen(process.env.PORT || 8080, () => {
	console.log(`server is running on port ${process.env.PORT || 8080}`);
});

runDB();
