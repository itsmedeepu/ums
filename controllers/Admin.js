//require admin modal
const Admin = require("../models/Admin");

//for get all admins
const GetAdmin = async (req, res, next) => {
  try {
    const Data = await Admin.find({});

    if (Data) {
      res.send(Data);
    } else {
      res.send("something went  bad ");
    }
  } catch (err) {
    console.log(err);
  }
};
//adding new admins
const NewAdmin = async (req, res, next) => {
  try {
    const data = await new Admin(req.body);
    const savetodb = data.save();
    if (savetodb) {
      res.send(data);
    } else {
      res.send("some error");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GetAdmin, NewAdmin };
