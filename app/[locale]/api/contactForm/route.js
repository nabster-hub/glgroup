import nodemailer from  "nodemailer"
import {NextRequest, NextResponse} from "next/server";

export async function POST(request){
    try{
        const {name, phone, email} = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'mail_ru',
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PUBLIC_PASSWD,
            }
        })
        console.log(process.env.EMAIL)
        console.log(process.env.PUBLIC_PASSWD)

        const mailOption = {
            from: process.env.EMAIL,
            to: process.env.TO_EMAIL,
            subject: 'New question from contact form',
            html: `
            <h3> Question from ${name} </h3>
            <ul>
            <li>Name: ${name}</li>
            <li>phone number: ${phone}</li>
            <li>Email: ${email}</li>
            </ul>
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({message: "Email send successfully", status: 200}, {status: 200})
    }catch (e) {
        return NextResponse.json({message: "Failed to send mail", status: 500}, {status: 500})
    }

}