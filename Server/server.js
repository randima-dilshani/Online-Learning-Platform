const express = require("express");
const cors = require("cors");
require("express-async-errors");

const databaseConfig = require("./config/database.config");
const errorHandlerMiddleware = require("./error/error.middleware");
const NotFoundError = require("./error/error.classes/NotFoundError");

const constants = require("./constants");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


//error handler middleware
app.use(errorHandlerMiddleware);

//404 not found route
app.use((req, res, next) => {
    throw new NotFoundError("API endpoint not found!");
  });


  const start = async () => {
    const port = process.env.PORT || 5001;
    try {
      await databaseConfig.connectDB();
      app.listen(port, () => {
        console.log(`Server is running on port ${port}...`);
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  start();
  