const sgMail = require("@sendgrid/mail");

module.exports = userEmail => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(
    {
      from: "noreply@wisepanda.io",
      to: userEmail,
      templateId: "d-489fe786c3ad4b6e9b07830ecfe8444b",
      dynamic_template_data: {
        code: activationCodeObject.code
      }
    },
    (err, result) => {
      if (err) {
        console.log("Error occured while sending verification mail to ", userEmail);
        throw new Error(err.message);
      } else {
        console.log("Succcessfuly sent verification mail to ", userEmail);
      }
    }
  );
};
