const sgMail = require("@sendgrid/mail");

module.exports = ({email, code}) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(
    {
      from: "noreply@wisepanda.io",
      to: email,
      templateId: "d-489fe786c3ad4b6e9b07830ecfe8444b",
      dynamic_template_data: {
        code: code
      }
    },
    (err, result) => {
      if (err) {
        console.log("Error occured while sending verification mail to ", email);
        throw new Error(err.message);
      } else {
        console.log("Successfully sent verification mail to ", email);
      }
    }
    );
  } catch (error) {
    console.log(error);
  }
  
};
