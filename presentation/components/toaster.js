
export function showMessage(message, type = 'success') {
  const messageBox = document.getElementById('messageBox');
  messageBox.textContent = message;
  messageBox.className = `message-box ${type}`;

  setTimeout(() => {
    messageBox.classList.add('hidden');
  }, 3000);
}