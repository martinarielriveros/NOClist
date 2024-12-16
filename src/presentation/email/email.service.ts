import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugins";

export interface emailToI {
  to: string | string[];
  from?: string;
  subject: string; // Subject line
  text: string; // plain text body
  html?: string; // html body
  attachments?: { filename: string; path: string }[]; // attachments for email (if any)
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
    host: "smtp.ethereal.email",
    // attachments: TODO
    port: envs.MAILER_PORT,
    secure: false, // true for port 465, false for other ports
  });

  async sendMail(emailTo: emailToI): Promise<boolean> {
    const { to, subject, text, html, attachments = [] } = emailTo;
    // send mail with defined transport object
    try {
      const sentInfo = await this.transporter.sendMail({
        from: envs.MAILER_SENDER.toString(), // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
        attachments, // array of attachments if any
      });
      console.log(
        `this is the info response obj (successfully sent): ${JSON.stringify(
          sentInfo,
          null,
          2
        )}`
      );
      return true;
    } catch (e) {
      console.log("could not send email: ", e);
      return false;
    }
  }
}
