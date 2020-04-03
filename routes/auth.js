const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

//Register
router.post("/register", async (req, res) => {
  //Validate before adding user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if username is taken
  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) return res.status(400).send("username taken");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //Create a new user
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save().then(() => {
      res.send(savedUser.username + " registered");
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  //Validate before logging in user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Search db for user using username, if found return user
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("username or password invalid");

  //Check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("username or password invalid");

  //Return JWT
  const token = jwt.sign({ username: user.username }, process.env.SECRET_TOKEN);
  //   res.send(token);
  const cookieOptions = {
    httpOnly: true,
    expires: 0
  };
  if (!req.body.rememberMe) {
    cookieOptions.expires = new Date(Number(new Date()) + 1800000);
    // cookieOptions.expires = new Date(Number(new Date()) + 60000);
    console.log("Done set expire: " + cookieOptions.expires);
  }
  res.cookie("authToken", token, cookieOptions);
  res.send();
  console.log(user.username + " logged in, cookies sent");
  //   res.send(user.username + " logged in with token: " + token);
});
module.exports = router;
