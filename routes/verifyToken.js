const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //Headers io??
  // console.log(req.headers.cookie);
  if (!req.headers.cookie) {
    return res.status(401).send("Access Denied");
  }

  let token = "";
  const splitted = req.headers.cookie.split(";");
  for (let i = 0; i < splitted.length; i++) {
    if (splitted[i].split("=")[0] == "authToken") {
      token = splitted[i].split("=")[1];
    }
  }
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    //The verify method returns user object of the verified  and now logged in user,
    //let's attach it to the req to make it available everywhere
    req.user = verified;
    next();
  } catch (error) {
    // res.clearCookie("authToken");
    res.status(401).send("Invalid Token");
  }
};
