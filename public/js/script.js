//validation function for user registration
$(document).ready(function () {
  $("#register").on("click", function (e) {
    e.preventDefault();
    let RegisterFormData = $("#register-form").serialize();

    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let cpassword = $("#cpassword").val();

    if (name == "") {
      alert("Enter Name");
      return false;
    }
    if (email == "") {
      alert("Enter email");
      return false;
    }

    if (password == "") {
      alert("Enter password");
      return false;
    }

    if (cpassword == "") {
      alert("Enter confim Password");
      return false;
    }
    if (cpassword !== password) {
      alert("Confirm Password Not Matching");
      return false;
    } else {
      //create a post request to the server

      $.ajax({
        url: "/user/register",
        method: "POST",
        data: RegisterFormData,
        success: function (res) {
          if (res == "1") {
            alert("user Regsistred Successfully");
            return true;
          } else if (res == "2") {
            alert("user already exist with same mail id");
          } else {
            alert("server not working");
          }
        },
      });
    }
  });
});

//for login request

//validation function for user registration
$(document).ready(function () {
  $("#login").on("click", function (e) {
    e.preventDefault();
    let LoginFormData = $("#login-form").serialize();

    let email = $("#email").val();
    let password = $("#password").val();

    if (email == "") {
      alert("Enter email");
      return false;
    }

    if (password == "") {
      alert("Enter password");
      return false;
    } else {
      //create a login  request to the server

      $.ajax({
        url: "/user/login",
        method: "POST",
        data: LoginFormData,
        dataType: "json",
        success: function (res) {
          if (res == "2") {
            alert("Invalid Login Details");
            return true;
          } else if (res == "3") {
            alert("User Not exist with this mail id ");
          } else if (res == "4") {
            alert("server not working");
          } else {
            alert("User Logged In sucessfully");
          }
        },
      });
    }
  });
});

//reset password

$(document).ready(function () {
  $("#reset").on("click", function (e) {
    e.preventDefault();
    let ResetFormData = $("#reset-form").serialize();

    let email = $("#email").val();
    let password = $("#password").val();
    let cpassword = $("#cpassword").val();

    if (email == "") {
      alert("Enter email");
      return false;
    }

    if (password == "") {
      alert("Enter password");
      return false;
    }
    if (cpassword == "") {
      alert("Enter confirm password");
      return false;
    }
    if (cpassword != password) {
      alert(" Password Not matching");
      return false;
    } else {
      //create a login  request to the server

      $.ajax({
        url: "/user/reset",
        method: "POST",
        data: ResetFormData,
        dataType: "json",
        success: function (res) {
          if (res == "2") {
            alert("Email Not Found ");
            return true;
          } else if (res == "3") {
            alert("Server Error");
          } else {
            alert("Password Resetted Sucessfully ");
          }
        },
      });
    }
  });
});
