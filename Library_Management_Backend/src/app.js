const express = require("express");
const cors = require("cors");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");
const issuedBookRoutes = require("./routes/issuedBookRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// HOME ROUTE
app.get("/", (req, res) => {
    res.send("Library Management API is working!");
});


// AUTHOR ROUTES
app.use("/authors", authorRoutes);

// BOOKs routes
app.use("/books", bookRoutes);

// Member routes
app.use("/members", memberRoutes)

// issued-books
app.use("/api/issued-books", issuedBookRoutes);

// get reports
app.use("/reports", reportRoutes);

module.exports = app;