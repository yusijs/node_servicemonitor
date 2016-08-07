import nodemailer = require("nodemailer");

export class AppConfig {
}

export class MailConfig {
  mailConfig: nodemailer.SendMailOptions;
  transporter: nodemailer.Transport;

  constructor(private _to: string, private _subject: string, private _body: string, transporter?: string) {

    this.mailConfig = {
      "from": "Your Name <Your@Email.Com>",
      "to": this._to,
      "subject": this._subject,
      "html": this._body
    }
  }
}

export class MailTransport {
  public transporter: nodemailer.Transport;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.host',
      port: 123,
      secure: true,
      auth: {
        user: '',
        pass: ''
      }
    })
  }
}