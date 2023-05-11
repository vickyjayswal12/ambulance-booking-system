const nodemailer = require('nodemailer');
// const nodemailer = require('nodemailer');

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kj0768151@gmail.com',
    pass: 'obyeerdsmidgdgaa'
  }
});
async function sendConfirmationEmail(email,otpcode) {
    try {
      const mailOptions = {
        from: 'kj0768151@gmail.com',
        to: email,
        subject: 'Confirmation Email',
        text: `thanks for registration on book your ambulance and Your OTP code is: ${otpCode}`
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent:', info.response);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  }
  // const email = 'ravijayswal69@gmail.com';
//   const confirmationCode = 'abc123'; // Replace with your actual confirmation code
  
//   sendConfirmationEmail(email, confirmationCode);

async function sendConfirmation(email) {
  try {
    const mailOptions = {
      from: 'kj0768151@gmail.com',
      to: email,
      subject: 'Confirmation Email',
      text: `your registration is successfully thanks for registration on book your ambulance `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.response);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}
  module.exports={sendConfirmationEmail,sendConfirmation};
    