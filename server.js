const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

require('dotenv').config()
const app = express();

//----------------ROUTESOURCES--------------------
const applicantRouter = require("./src/routes/applicant.routes");

//----------------MIDDLEWARES--------------------
app.use(morgan('dev'));
// parse requests of content-type - application/json
app.use(express.json());
// Enable requests from origins
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true
}));
app.use(cookieParser())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//------------------SETTINGS----------------
const PORT = process.env.PORT || 4000; // set port, listen for requests


//------------------ROUTES------------------
app.use("/api/applicant", applicantRouter);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Node.js application." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

