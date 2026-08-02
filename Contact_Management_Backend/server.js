const express = require("express");
const connectDB = require("./config/database");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/contacts", contactRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Contact Management API is running"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});