import * as mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    name:String,
    category:String,
    color:String,
    company:String,
    variant:String,
},{timestamps:true})

export interface IVehicle extends mongoose.Document{
    name:string,
    category:string,
    color:string,
    variant:string,
    company:string
}

export const Vehicle = mongoose.model<IVehicle>("Vehicles",VehicleSchema)