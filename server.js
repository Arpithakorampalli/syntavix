const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'syntavix@gmail.com', // Your Gmail address
      pass: 'vnbm pxzn uxdq jovi'   // App password, NOT your Gmail password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: email,
    to: 'syntavix@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
