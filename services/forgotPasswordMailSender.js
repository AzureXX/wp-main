const sgMail = require('@sendgrid/mail');

module.exports = (verifiedEmail, code) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(
      {
        from: 'noreply@wisepanda.io',
        to: verifiedEmail,
        templateId: 'd-489fe786c3ad4b6e9b07830ecfe8444b',
        dynamic_template_data: {
          code: code
        }
      },
      (err, result) => {
        if (err) {
          console.log('Error occured while sending forgotten password mail to ', verifiedEmail);
          throw new Error(err.message);
        } else {
          console.log('Successfully sent forgotten password mail to ', verifiedEmail);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
