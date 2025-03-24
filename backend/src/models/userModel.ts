import mongoose, { Document , Schema } from "mongoose";

export interface IUser extends Document{
    firstName:string;
    lastName:string;
    email:string;
    password:string;

}

//the way the document will be stored in dp.
const userSchema=new Schema<IUser>({
    firstName: { type : String , required : true},
    lastName: { type : String , required : true},
    email: { type : String , required : true},
    password: { type : String , required : true},
}) 

//global model from mongoose instance to be used anywhere in the code.
//will be used with the mongoose connection.
// User in dp
export const userModel=mongoose.model<IUser>("User",userSchema);