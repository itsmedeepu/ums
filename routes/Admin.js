const express = require("express");
const router = express.Router();
//require admin  controller
const Admincontroller = require("../controllers/Admin");
//get all admins
router.get("/getuser", Admincontroller.GetAdmin);
//add new admins
router.post("/register", Admincontroller.NewAdmin);

module.exports = router;
