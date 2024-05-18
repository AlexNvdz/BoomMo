var nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config({path: "../../.env"})

class Nodemailer {
    static async sendEmail(body) {
        try {
            const {email,subject,html,text} = body
            const options = {
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: "boommo.noreply@gmail.com",
                    pass: "piyl hcvt xvdv rscj"
                }
            }
            const msg = {
                from: "boommo.noreply@gmail.com",
                to: email,
                subject: subject,
                text,
                html: html
            }
            const transporter = nodemailer.createTransport(options)
            await transporter.sendMail(msg)
            
        } catch (error) {
            console.log(error)
        }
        }
}

module.exports = {Nodemailer}