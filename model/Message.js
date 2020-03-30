const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    min: 1,
    //max same as char limit of whatsapp messages
    max: 65536
  },
  to: {
    type: String,
    required: true,
    //min, max same as those of username
    min: 3,
    max: 255
  }
});

module.exports = mongoose.model("Message", messageSchema, "messages");
