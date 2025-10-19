import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMPT_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivateMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Foody account activation " + process.env.API_URL,
            text: "",
            html: `
                <div>
                    <h1>Ссылка для активации аккаунта</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

export default new MailService()