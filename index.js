require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//require database connection
require("./db/Conn");
//convert body data to json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set view engine

app.set("view engine", "ejs");

//set css and static files

app.use(express.static(__dirname + "/public/"));

//default home page for checking server is working or not
app.get("/", (req, res) => {
  res.send("im Home page");
});

//require routes for user
const userRoutes = require("./routes/User");

//require routes for admin
const adminRoutes = require("./routes/Admin");

//routes for user
app.use("/user", userRoutes);

//routes for admin
app.use("/admin", adminRoutes);

//listen at port
app.listen(port, () => {
  console.log(`server running at port http://localhost:${port}`);
});
