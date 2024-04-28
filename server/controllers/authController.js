const User = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { createJWT } = require("../utils/tokenUtils");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");





const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

//create a user
const registerUser = async (req, res) => {
  //makes the 1st account register an Admin
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  
  const newUser = await User.create(req.body);
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MY_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
  
  let mailOptions = {
    from: process.env.MY_EMAIL,
    to: req.body.email,
    subject: "Account Created",
    text: `Hello ${req.body.firstName} ${req.body.lastName},\n\nWelcome to our app! Your account has been created successfully.\n\nBest Regards,\nThe Project Navigator Team`,
    
    
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  console.log(req.body.isProjectManager);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }

  const token = createJWT({
    userId: user._id,
    role: user.role,
    isProjectManager: user.isProjectManager,
  });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "User logged in successfully" });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out successfully!" });
};

module.exports = { registerUser, loginUser, logoutUser };
