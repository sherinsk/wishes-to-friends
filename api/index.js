const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const app = express();

// Step 1: Setup your email transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "sherinsk.backenddev@gmail.com",
      pass: "jcjn gesr bjjy zzts",
    },
  });

// Step 2: Define your cron job with timezone set to India (Asia/Kolkata)
cron.schedule('17 19 * * *', () => {
    console.log('Sending email at 7:00 PM IST daily.');

    // Step 3: Define the email options
    let mailOptions = {
        from: 'sherinsk.backenddev@gmail.com',    
        to: 'sherinsk007@gmail.com', 
        subject: 'Daily Email Reminder',
        text: 'This is your daily reminder email!',
    };

    // Step 4: Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ', error);
        }
        console.log('Email sent: ' + info.response);
    });
}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Set to Indian Standard Time (IST)
});

app.get('/', (req, res) => {
    res.send('Cron job server is running, and the cron job will send emails at 9:08 PM IST.');
});

// Step 4: Set the port and start the server
const port = 3000; // You can change this port number if needed
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});