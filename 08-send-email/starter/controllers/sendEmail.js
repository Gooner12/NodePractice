const nodemailer = require("nodemailer");
const sib = require("sib-api-v3-sdk");

// getting the client
const client = sib.ApiClient.instance;
// getting the api key object from the client
const apiKey = client.authentications["api-key"];

// creating a transactional email api. Transactional email is used for resetting password, confirmation mail, etc. For newsletters, other emails, campaign email is used
const transactionalEmailAPI = new sib.TransactionalEmailsApi();
apiKey.apiKey = process.env.SIB_API_KEY;

// setting up the sender and receivers
const sender = { email: "kcbiaksh@gmail.com", name: "Bikash" }; // email has to be the same one that was used for creating an account on send in blue
const receivers = [
    { email: "bikashkc535@gmail.com" }
]; // the receiver must have an array of objects. Passing only object will result in a bad request.

// send email with ethereal
const sendEmailEthereal = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "jordan.terry55@ethereal.email",
      pass: "ExXxnBPZPShtAWwvqa",
    },
  });

  let info = await transporter.sendMail({
    from: '"Codding Addict" <codingaddict@gmail.com>',
    to: "bar@gmail.com",
    subject: "hello",
    html: "<h2>Sending Emails with Node.js</h2>",
  });

  res.json(info);
};

// sending email with send in blue
const sendEmail = async (req, res) => {
  const msg = {
    sender, //this can have a variable name sender only no key value
    to: receivers,
    subject: "Sending with Send In Blue",
    textContent: "Using Node.js to send an email with name",
    htmlContent: "<h2><u>ADIOS!</u></h2>",
  };
  const info = await transactionalEmailAPI.sendTransacEmail(msg);
  res.json({ info });
};

module.exports = sendEmail;
