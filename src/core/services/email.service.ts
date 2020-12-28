import * as nodemailer from 'nodemailer';
import { EMAIL_SENDER_EMAIL, EMAIL_SENDER_PASSWORD } from "../../config";

export const send = async (emails: Array<string>) => {
    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     requireTLS: true,
    //     auth: {
    //         user: EMAIL_SENDER_EMAIL, // like : abc@gmail.com
    //         pass: EMAIL_SENDER_PASSWORD           // like : pass@123
    //     }
    // });

    // let testEmailAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: EMAIL_SENDER_EMAIL,
            pass: EMAIL_SENDER_PASSWORD
        },
    });

    emails.forEach(email => {
        const mailOptions = {
            from: 'noreplay@domail.com',
            to: email,
            subject: 'Hello',
            text: 'Hello from node.js'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(`error: ${error}`);
            }
            console.log(`Message Sent ${info.response}`);
        });
    });

};
