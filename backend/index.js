const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const userRoutes = require("./Routes/userRoute");
const blogRoutes = require("./Routes/blogRoute");
const adminRoutes = require("./Routes/adminRoute");
const cors = require("cors");

const app = express();
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

async function connectiontodb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("The app is listening in the port no 8080...");
    });
  } catch (error) {
    console.log(error);
    console.log("connection cannot be established...");
  }
}

connectiontodb();

// User functions
app.use("/user", userRoutes);

// Blog functions
app.use("/blog", blogRoutes);

// Admin Functions
app.use("/admin", adminRoutes);
