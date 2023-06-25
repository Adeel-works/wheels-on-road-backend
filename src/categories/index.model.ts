import * as mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:String,
    categoryId:String,
},{timestamps:true})

export interface ICategory extends mongoose.Document{
    name:string,
    categoryId:string,
}

export const Categories = mongoose.model<ICategory>("Categories",categorySchema)