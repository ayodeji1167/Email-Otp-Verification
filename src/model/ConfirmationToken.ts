import { AppUserClass } from "./AppUserModel";
import {prop, Ref , getModelForClass , modelOptions} from "@typegoose/typegoose"


export class ConfirmationTokenClass{
    @prop({ref:()=>AppUserClass , required:true})
    userId: Ref<AppUserClass> | null;

    @prop({type: ()=> String, unique:true})
    token: string

    @prop({type:(()=>Date) , required: true})
    createdAt: Date

    @prop({type:(()=>Date) , required: true})
    expiresAt: Date
}

export const ConfirmationTokenModel = getModelForClass(ConfirmationTokenClass);