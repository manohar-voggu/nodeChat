const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.disable("x-powered-by");

//Import Routes
const authRoute = require("./routes/auth");
// const msgRoute = require("./routes/msg");
const messengerRoute = require("./routes/messenger");
dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to DB");
    }
  }
);

//Middleware
app.use(morgan("dev"));
app.use(express.json());
//Route Middlewares
app.use("/api/user", authRoute);
// app.use("/api/user", msgRoute);
app.use("/", messengerRoute);
app.use(express.static("./public"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

// Notes:
// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
