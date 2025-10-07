const chat = document.getElementById('chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';

  if(sender === 'bot'){
    msgDiv.innerHTML = `<div class="avatar">🤖</div><div class="message">${text}</div>`;
  } else {
    msgDiv.innerHTML = `<div class="message">${text}</div>`;
  }

  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const text = userInput.value;
  if (!text) return;
  addMessage(text, 'user');
  userInput.value = '';

  // Add typing animation
  const typingDiv = document.createElement('div');
  typingDiv.className = 'bot-message';
  typingDiv.innerHTML = `<div class="avatar">🤖</div><div class="message">...</div>`;
  chat.appendChild(typingDiv);
  chat.scrollTop = chat.scrollHeight;

  fetch('/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: text})
  })
  .then(res => res.json())
  .then(data => {
    typingDiv.querySelector('.message').innerText = data.response;
  })
  .catch(err => typingDiv.querySelector('.message').innerText = 'Error connecting to server');
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => { if(e.key==='Enter') sendMessage(); });