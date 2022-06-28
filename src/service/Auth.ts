
import AppUserModel, { AppUserClass } from "../model/AppUserModel";
import { BadRequestError } from "../error/BadRequestError";
import { sendConfirmationToken } from "../config/NodeMailerConfig";
import bcrypt from "bcrypt";
import { ConfirmationTokenModel } from "../model/ConfirmationToken";
import { VerifyUserInput } from "../schema/AuthenticationSchema";


export const signUp = async (input: Partial<AppUserClass>) => {
  const { username, email } = input;

  const userTestEmail = await AppUserModel.findOne({ email });
  if (userTestEmail) {
    throw new BadRequestError("User With That Email Already Exist");
  }

  //Creete User
  const user =await AppUserModel.create(input);

 
  const otp: string = Math.floor(Math.random() * 9000 + 1000).toString();

  //Hash the otp
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);

  const confirmationObject = new ConfirmationTokenModel({
    userId: user._id,
    token: hashedOtp,
    createdAt: Date.now(),
    expiresAt: Date.now() + 3600000
  })

  //Save The  Confirmation Object
  await confirmationObject.save();
  //Send The Email
  sendConfirmationToken(username || "", email || "", otp);
  return user._id;
};


//Verification Of Otp
export const verifyOtp = async(input: VerifyUserInput)=>{
  const {userId, token} = input;
  if(!userId || !token){
    throw new BadRequestError("Enter Otp")
  }
  const ConfirmationObject =   await ConfirmationTokenModel.findOne({userId})
  if(!ConfirmationObject){
    throw new BadRequestError("Account does not exist or has been Verified, please sign up or  log in")
  }

  const {expiresAt} = ConfirmationObject;
  const hashedToken = ConfirmationObject.token;
  if(expiresAt < new Date()){
    await ConfirmationTokenModel.deleteMany({userId})
    throw new Error("This  token has expired")
  }

 const validateOtp = await bcrypt.compare(token, hashedToken)
 if(!validateOtp){
  throw new BadRequestError("Invalid OTP")
 }
 else{
  await AppUserModel.updateOne({_id:userId}, {status:"active"})
  await ConfirmationTokenModel.deleteMany({userId})

 }

}