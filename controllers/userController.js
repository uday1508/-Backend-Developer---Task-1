const User = require("../models/User"); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
require("dotenv").config(); 
var ip = require('ip');

const Session = require('../models/sessions');

const IPADD  = ip.address();
console.log(IPADD);
// Register User
exports.register = async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password, picture } = req.body; // Destructure req.body

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exists
    // Validate if user exists in our database
    const oldUser = await User.findOne({ email }); // Find user with requested email

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10); // Encrypt password with bcryptjs

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      picture: picture
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    
    // Return new user and token
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};


// Login User
exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    
    // Validate if user exists in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // Save user token
      user.token = token;

      let session = await Session.findOne({ userId: user._id });
      console.log(session);
      if (session) {
        session.loginTime = new Date();
        session.ipAddress = IPADD;
      } else {
        session = new Session({
          userId: user._id,
          ipAddress: IPADD,
          loginTime: new Date()
        });
      }
      await session.save();

      // Send user response
      return res.status(200).json(user);
    }

    // Invalid credentials
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}

exports.logout = async (req,res) => {
  const { email } = req.body;
  console.log(req.body);
  console.log(email,"EMAIL");
  const user = await User.findOne({ email });

  let session = await Session.findOne({ userId: user._id });
  console.log(session);
  if (session) {
    session.logoutTimes = Date.now();
    session.ipAddress = IPADD;
  } else {
    session = new Session({
      userId: user._id,
      ipAddress: IPADD,
      loginTime: new Date()
    });
  }
  await session.save();

  return res.status(200).send(session);
}
