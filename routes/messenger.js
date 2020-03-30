const router = require("express").Router();
const verify = require("./verifyToken");
const path = require("path");
const io = require("socket.io")(4000);

const resolvedPath = path.resolve("messenger.html");

// console.log(resolvedPath);

router.get("/messenger", verify, (req, res) => {
  res.sendFile(resolvedPath);

  io.on("connection", socket => {
    socket.removeAllListeners();
    socket.on("send-chat-message", message => {
      // console.log(message);
      // console.log(req.user.username);
      socket.broadcast.emit("chat-message", {
        from: req.user.username,
        message: message
      });
    });
    socket.on("disconnect", () => {
      socket.broadcast.emit("left-message", req.user.username);
    });
  });
});

module.exports = router;
