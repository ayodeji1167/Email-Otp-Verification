import dotenv from "dotenv"
dotenv.config();


const SERVER_PORT = process.env.SERVER_PORT? Number(process.env.SERVER_PORT): 5000
const MONGO_USERNAME = process.env.MONGO_USERNAME || ""
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@firstnodeproject.g442jly.mongodb.net/EmailValidation?retryWrites=true&w=majority`
const EMAIL_USER = process.env.AUTH_EMAIL || ""
const EMAIL_PASS = process.env.AUTH_PASSWORD || ""


export const config = {
    mongo_uri : MONGO_URL,
    server_port : SERVER_PORT,
    email_user : EMAIL_USER,
    email_pass: EMAIL_PASS
}


