const nodemailer = require('nodemailer');



// send email with ethereal
const sendEmail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jordan.terry55@ethereal.email',
            pass: 'ExXxnBPZPShtAWwvqa'
        }
    });

    let info = await transporter.sendMail({
        from: '"Codding Addict" <codingaddict@gmail.com>',
        to: 'bar@gmail.com',
        subject: 'hello',
        html:'<h2>Sending Emails with Node.js</h2>'
    });

    res.json(info);
};

module.exports = sendEmail;