// Import the dotenv module to load environment variables from the .env file
require("dotenv").config();

// Import express for building the web server and mongoose for MongoDb interaction
const express = require("express");
const mongoose = require("mongoose");

// Import the route handlers for user, course, admin from the routes folder
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");

const app = express();

// Retrieve the PORT from the .env file, default to 3000 if its not provided
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Retrieve the MongoDB connection string (MONGO_URL) from the .env file
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);


app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
  try {
      await mongoose.connect(MONGO_URL);

      console.log("Connected to the database");

      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
} catch(e){
    console.error("Failed to connect to the database", e);
    }
}

main();