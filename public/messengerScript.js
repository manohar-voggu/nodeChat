const socket = io("http://localhost:4000");

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
socket.on("chat-message", data => {
  //   console.log(data);
  console.log("using socketid: " + socket.id);
  appendMessage(data.from + ": " + data.message);
});

socket.on("left-message", data => {
  appendMessage(data + " LEFT");
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  console.log("append called");
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  // var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  // console.log(randomColor);
  messageElement.setAttribute(
    "style",
    // "background-color: #" + randomColor + ";"
    "background-color: #b3afaf;margin: 2px;"
  );
  messageContainer.append(messageElement);
}
