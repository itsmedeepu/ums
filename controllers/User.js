//require user modal
const Register = require("../models/User");

const bcrypt = require("bcrypt");

const Reg = (req, res, next) => {
  res.render("Register", { title: "Registration Page" });
};

const Userlogon = (req, res, next) => {
  res.render("login", { title: "Login Page" });
};

const ResetPage = (req, res, next) => {
  res.render("Reset", { title: "Reset Password" });
};

const DashbaordPage = (req, res, next) => {
  res.render("Dashboard", { title: "Dashboard " });
};

//fetch all users
const getAllUsers = async (req, res, next) => {
  try {
    const Data = await Register.find({});

    if (Data) {
      res.send(Data);
    } else {
      res.send("something went  bad ");
    }
  } catch (err) {
    console.log(err);
  }
};
//add new user
const newUser = async (req, res, next) => {
  try {
    const beforeRegister = await Register.findOne({ email: req.body.email });
    if (!beforeRegister) {
      const data = new Register(req.body);
      data.password = await bcrypt.hash(data.password, 10);
      data.save();
      // res.send("1");
      res.send("1");
    } else {
      res.send("2");
    }
  } catch (err) {
    console.log(err);
    res.send("3");
  }
};

//user login

const UserLogin = async (req, res, next) => {
  try {
    const FindtheUser = await Register.findOne({ email: req.body.email });
    if (FindtheUser) {
      const VerifyPassword = await bcrypt.compare(
        req.body.password,
        FindtheUser.password
      );
      if (VerifyPassword) {
        req.session.email = FindtheUser.email;
        res.redirect("/Dashboard");
      } else {
        res.send("2");
      }
    } else {
      res.send("3");
    }
  } catch (err) {
    res.send("4");
  }
};

//userAuthentication
const UserAuth = async (req, res, next) => {
  if (!req.session.email) {
    res.render("Login", { title: "Login Page" });
  } else {
    res.render("Dashbaord", { title: "Dashboard" });
  }
};

//reset user password

const ResetPassword = async (req, res, next) => {
  try {
    const ResetHash = await bcrypt.hash(req.body.password, 10);
    const ResetUpdate = await Register.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: ResetHash } }
    );
    if (ResetUpdate) {
      res.send("1");
    } else {
      res.send("2");
    }
  } catch (err) {
    res.send("3");
  }
};

//update user
const UpdateUser = async (req, res, next) => {
  const UpdateData = req.body;

  try {
    //before updating hash the password
    UpdateData.password = await bcrypt.hash(UpdateData.password, 10);
    const findBeforeUpdate = await Register.findOneAndUpdate(
      req.params.id,
      UpdateData,
      { new: true }
    );

    if (findBeforeUpdate) {
      res.send(findBeforeUpdate);
      console.log("user Updated");
    } else {
      res.send("Data Not Updated");
      console.log("user Not Found");
    }
  } catch (err) {
    res.send("Something Went Bad at Server ");

    console.log(err);
  }
};

//delete function for user
const UserDelete = async (req, res, next) => {
  const UserId = req.params.id;
  try {
    const fetchUser = await Register.findOneAndRemove({ _id: UserId });
    if (fetchUser) {
      res.send("user deleted ");

      console.log("user deleted ");
    } else {
      console.log("User Not found or alredy deleted ");
    }
  } catch (err) {
    console.log(err);

    res.status(404).send("something bad at server");
  }
};

module.exports = {
  getAllUsers,
  newUser,
  UserDelete,
  UpdateUser,
  Reg,
  UserLogin,
  Userlogon,
  ResetPassword,
  ResetPage,
  UserAuth,
  DashbaordPage,
};
