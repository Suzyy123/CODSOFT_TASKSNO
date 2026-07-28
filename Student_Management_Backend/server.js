const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");


dotenv.config();

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.get("/", (req, res) => {
  res.send("Student Record API Running");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});