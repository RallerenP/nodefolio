import nodemailer from 'nodemailer';
import renderer from "./renderer.js";
import fs from "fs";

let transporter;

export function config() {
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
}

export async function send(name, email, message) {
    // Send email to runner
    await transporter.sendMail({
        from: `"${name}" <nodefolio@rpovlsen.com>`,
        to: process.env.EMAIL_RECEIVER,
        subject: `Nodefolio message from: "${name}" <${email}>`,
        text:
            `Message from: ${name} <${email}> 

            ${message}`
    })

    // Send confirmation mail to sender
    // The rendered email might not work on all email clients, especially ones rendering with IE Engine. For example the Office 356 Outlook client (Why microsoft????).
    // TODO: Fix rendered email
    const rendered_email = await renderer.render(fs.readFileSync("email/customer_template.html", 'utf-8'), { MESSAGE: message })

    console.log(rendered_email)
    await transporter.sendMail({
        from: 'Rasmus Povlsen <nodefolio@rpovlsen.com>',
        to: email,
        subject: "Thank you for contacting me!",
        html: rendered_email
    })
}