const messagesContainer = document.getElementById("messages");
const textInput = document.getElementById("text-input");
const sendButton = document.getElementById("send-button");
const emojiBtn = document.querySelector("#emoji-btn");
const picker = new EmojiButton();

function appendMessage(message, sender, sentDate, isMyMessage) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "message" + (isMyMessage ? " my-message" : "");
  messageDiv.innerHTML = `
    <div><strong>${sender}</strong> - ${sentDate}<br></div>
    ${message}<br>
    <button class="delete-button" onclick="deleteMessage(this)">🗑️</button>
    `;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    messageDiv.classList.add("show");
  }, 50);
}

function deleteMessage(deleteButton) {
  const messageDiv = deleteButton.parentElement;
  messageDiv.classList.remove("show");
  setTimeout(() => {
      messageDiv.remove();
  }, 500); 
}

function sendMessage() {
  const message = textInput.value.trim();
  if (message !== "") {
    const sender = "You";
    const sentDate = new Date().toLocaleString();
    appendMessage(message, sender, sentDate, true);
    textInput.value = "";

    // Simulate someone else typing and sending a message
    setTimeout(() => {
      const messages = [
        "Hello!",
        "How are you?",
        "What are you up to?",
        "I'm sending a message...",
        "Just a moment...",
        "Almost done...",
        "Here's another message!",
      ];

      const simulatedMessage =
        messages[Math.floor(Math.random() * messages.length)];
      const sender = "Friend";
      const sentDate = new Date().toLocaleString();
      appendMessage(simulatedMessage, sender, sentDate, false);
    }, getRandomInterval());
  }
}

function getRandomInterval() {
  return Math.random() * 1000 + 5000; 
}

textInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

sendButton.addEventListener("click", sendMessage);

window.addEventListener("DOMContentLoaded", () => {
  picker.on("emoji", (emoji) => {
    document.querySelector("input").value += emoji;
  });
  emojiBtn.addEventListener("click", () => {
    picker.togglePicker(emojiBtn);
  });
});
