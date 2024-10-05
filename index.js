const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const axios = require('axios');  // Add axios for making HTTP requests

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

// Step 2: Define your email cron job with timezone set to India (Asia/Kolkata)
cron.schedule('20 20 * * *', () => {
    console.log('Sending email at 7:25 PM IST daily.');

    let mailOptions = {
        from: 'sherinsk.backenddev@gmail.com',
        to: 'sherinsk007@gmail.com',
        subject: 'Daily Email Reminder',
        text: 'This is your daily reminder email!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ', error);
        }
        console.log('Email sent: ' + info.response);
    });
}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Indian Standard Time (IST)
});

// Step 3: Define a cron job to ping the server every 14 minutes
cron.schedule('*/14 * * * *', () => {
    console.log('Pinging the server every 14 minutes to keep it alive.');

    // Ping the server's /ping route
    axios.get('https://wishes-to-friends.onrender.com/ping')
        .then(response => {
            console.log('Ping successful:', response.data);
        })
        .catch(error => {
            console.error('Ping failed:', error);
        });
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

// Define the ping route for health checks
app.get('/ping', (req, res) => {
    res.send('Server is alive and running.');
});

// Default route
app.get('/', (req, res) => {
    res.send('Cron job server is running, and the cron job will send emails at 7:25 PM IST.');
});

// Step 4: Set the port and start the server
const port = 3000; // You can change this port number if needed
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
