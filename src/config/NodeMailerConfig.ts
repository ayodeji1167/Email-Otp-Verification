import nodemailer  from "nodemailer"
import { config } from "./config"


const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:config.email_user,
        pass: config.email_pass
    }
})

export const sendConfirmationToken =async (name:string, email: string, otp: string) => {
    transport.sendMail({
        from: config.email_user,
        to: email,
        subject: "Verify Your Account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for Registering. Please enter <b>${otp}</b> in  the app to verify your email address </p>
        <p>This code expires in one hour</p>`
      
})

}