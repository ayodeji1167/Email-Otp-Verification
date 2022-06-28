import { getModelForClass, modelOptions, prop, pre,post } from "@typegoose/typegoose";
import bcrypt from "bcrypt"



enum Status{
    ACTIVE= "active",
    PENDING = "pending"
}
@pre<AppUserClass>("save" , async function (next) {

    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
})

@modelOptions(
    {schemaOptions:{
        timestamps:true
    }}
)
export class AppUserClass{
    @prop({type:()=>String , required:true})
    username: string

    @prop({type:()=>String , required:true})
    password:string

    @prop({type:()=>String , required:true, unique:true})
    email:string

    @prop({type:()=> String, enum:Status, default:"pending"})
    status: Status

    @prop({type:()=>String , unique:true})
    confirmationCode: string

}

const AppUserModel = getModelForClass(AppUserClass);
export default AppUserModel;
