import nodemailer from "nodemailer";

class MailService {
  private static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });
}

export default MailService;
