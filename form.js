const form = document.querySelector('form');
const confirmationMessage = document.getElementById('confirmation');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      confirmationMessage.style.display = 'block';
      form.reset(); // Clear the form
    } else {
      alert('There was an error sending your message.');
    }
  })
  .catch(error => {
    alert('There was an error sending your message.');
    console.error('Error:', error);
  });
});