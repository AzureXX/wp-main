const sgMail = require('@sendgrid/mail');

module.exports = ({email, code}) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(
      {
        from: 'noreply@wisepanda.io',
        to: email,
        templateId: 'd-aad18a9132764d859dc41d1897ac7637',
        dynamic_template_data: {
          code: code
        }
      },
      (err, result) => {
        if (err) {
          console.log('Error occured while sending forgotten password mail to', email);
          throw new Error(err.message);
        } else {
          console.log('Successfully sent forgotten password mail to', email);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
