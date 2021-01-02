const nodemailer = require("nodemailer");
const { SENDGRID_API_KEY, EMAIL } = require("../config/keys");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_API_KEY,
    },
  })
);

let sendMail = (toId, sub, text) => {
  return transporter.sendMail({
    to: toId,
    from: EMAIL,
    subject: sub,
    html: `<h4>${text}</h4>`,
  });
};

module.exports = { sendMail };
