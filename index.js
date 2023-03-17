const express = require('express');
const app = express();

const appRoutes = require("./routes");

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

app.use("/api", appRoutes);

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URL;

const dbConnect = require('./db');

module.exports = app.listen(port, () => {
    // try {
      dbConnect(MONGO_URI);
      console.log("Database Connected");
    // } catch (error) {
    //   console.log("Database connection failed");
    //   console.log(error);
    // }
});