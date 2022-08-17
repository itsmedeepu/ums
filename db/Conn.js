//database connection file
const mongoose = require("mongoose");
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected and working fine");
  })
  .catch((err) => {
    console.log(err);
  });
