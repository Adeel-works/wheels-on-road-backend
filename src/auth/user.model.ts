/** @format */

import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:String,
    email:String,
    password:String,
    isActive:{
      default:true,
      type:Boolean
    },
},
{
    timestamps:true,
    strict:false
}
);

export interface IUser extends mongoose.Document {
  name:string,
  email:string,
  isActive:boolean
  password:string,
}

export const User = mongoose.model<IUser>("Users", userSchema);
