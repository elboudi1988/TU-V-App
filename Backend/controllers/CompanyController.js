const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail } = require("../helpers/mailer");
exports.register = async (req, res) => {
  try {
    const {
      anrede,
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      companyName,
      house_number,
      street,
      city,
      plz,
      role,
    } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email adress",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "Email adresse already exists",
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(companyName, 3, 35)) {
      return res.status(400).json({
        message: "company name must be between 3 and 35 characters. ",
      });
    }
    if (!validateLength(street, 2, 35)) {
      return res.status(400).json({
        message: "Street must be between 2 and 35 characters.",
      });
    }
    if (!validateLength(city, 2, 20)) {
      return res.status(400).json({
        message: "City must be between 2 and 20 characters.",
      });
    }
    if (!validateLength(password, 6, 30)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters.",
      });
    }
    //PasswordHashing
    const cryptedPassword = await bcrypt.hash(password, 12);
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    const user = await new User({
      anrede,
      first_name,
      last_name,
      bYear,
      bMonth,
      bDay,
      email,
      password: cryptedPassword,
      username: newUsername,
      companyName,
      street,
      house_number,
      city,
      plz,
      role,
    }).save();
    const emailVerivicationToken = generateToken(
      {
        id: user._id.toString(),
      },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerivicationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken(
      { id: user._id.toString() },
      //{ companyName: user.companyName },
      "7d"
    );
    res.send({
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: `Register Success ${first_name}  please activate your Email to start`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.ActivateAcount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "this Email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has ben activated successfuly" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/userController.js
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "The email address you entered is not connected",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid password. Please try again",
      });
    }

    // Token
    const token = generateToken(
      {
        id: user._id.toString(),
        companyName: user.companyName,
        role: user.role, // Save the role in the token
      },
      "7d"
    );

    // Cookies
    res.cookie("Authorization", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.send({
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      lastname: user.last_name,
      verified: user.verified,
      role: user.role, // Send the role to the client
      companyName: user.companyName,
      message: "Register Success! Please activate your Email to start",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*exports.logout = async (req, res) => {
  try {
    res.clearcookie("Authorization", "", { expires: new Date() });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};*/
exports.logout = (req, res) => {
  res.clearCookie("Authorization", "");
  res.status(200).json({ message: "Logged out successfully" });
};
