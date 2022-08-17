const express = require("express");
const router = express.Router();
//user controller
const Usercontroller = require("../controllers/User");

//getting all users
router.get("/getuser", Usercontroller.getAllUsers);
//render register page
router.get("/register", Usercontroller.Reg);
//render reset page

router.get("/reset", Usercontroller.ResetPage);

//render login page

router.get("/login", Usercontroller.Userlogon);

//render Dashboard
router.get("/Dashboard", Usercontroller.UserAuth, Usercontroller.DashbaordPage);

//for adding new user
router.post("/register", Usercontroller.newUser);
//for login checj
router.post("/login", Usercontroller.UserLogin);

//for reset password

router.post("/reset", Usercontroller.ResetPassword);

//update user

router.post("/update/:id", Usercontroller.UpdateUser);
//for delete the user
router.get("/delete/:id", Usercontroller.UserDelete);

module.exports = router;
