const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// HOME ROUTE
app.get("/", (req, res) => {
    res.send("Task Management API is working!");
});


// TASK ROUTES
app.use("/tasks", taskRoutes);


module.exports = app;