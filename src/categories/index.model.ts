import * as mongoose from "mongoose";
import { ORDER_DELIVERY_STATUS } from "../../types";

const categorySchema = new mongoose.Schema({
    name:String,
    categoryId:String,
},{timestamps:true})

export interface ICategory extends mongoose.Document{
    name:string,
    categoryId:string,
}

export const Categories = mongoose.model<ICategory>("Categories",categorySchema)