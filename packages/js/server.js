const express = require('express');
const bodyParser = require('body-parser');
const client = require('twilio')('your_account_sid', 'your_auth_token');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Assuming your HTML form has fields 'name' and 'message'
  const message = `New form submission from ${formData.name}: ${formData.message}`;

  // Replace 'whatsapp:+1234567890' with the recipient's phone number
  const to = 'whatsapp:+6281282471354';

  // Send the message using Twilio
  client.messages
    .create({
      body: message,
      from: 'whatsapp:+0987654321', // Your Twilio WhatsApp number
      to: to
    })
    .then((message) => console.log('Message sent:', message.sid))
    .catch((error) => console.error('Error sending message:', error));

  res.send('Form submission successful!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
