import { ServerRoute } from "@hapi/hapi";
import HttpStatus from "http-status-codes";
import * as Joi from 'joi';
import {  IVehicle, Vehicle } from "./index.model";



export const VehicleRoute: ServerRoute[] = [
    {
        method: "POST",
        path: '/add',
        handler: async (req, h) => {
            const {payload} = req;
            const vehicle = payload as IVehicle;
            const isFound = await Vehicle.findOne({name:vehicle.name,variant:vehicle.variant})
            if(isFound){
            return h.response({ success: false, message: "Vehicle already exists" }).code(HttpStatus.CONFLICT)
            }else{
            await Vehicle.create({...vehicle})
            return h.response({status:true,message:'Vehicle added successfully'}).code(HttpStatus.OK);
            }    
        },
        options:{
            auth:{
                strategies:["jwt"]
            },
            description:"Add New Vehicle",
            tags:["api"],
            validate:{
                payload:Joi.object({
                
    name:Joi.string().required(),
    category:Joi.string().required(),
    company:Joi.string(),
    color:Joi.string().required(),
    variant:Joi.string().required(),
                })
            }
        }
    },
    {
        method: "PUT",
        path: '/{id}',
        handler: async (req, h) => {
            const {payload,params} = req;
            const {id} = params 
            const vehicle = payload as IVehicle;
            const isFound = await Vehicle.findOne({_id:id})
            if(isFound){
                await Vehicle.updateOne({_id:isFound?._id},{$set:{...vehicle}})
                return h.response({status:true,message:'Vehicle updated successfully'}).code(HttpStatus.OK);
            }else{
                return h.response({ success: false, message: "Vehicle does not exist" }).code(HttpStatus.CONFLICT)
            }   
        },
        options:{
            auth:{
                strategies:["jwt"]
            },
            description:"Update Vehicle",
            tags:["api"],
            validate:{
                payload:Joi.object({
                    name:Joi.string(),
                    category:Joi.string(),
                    color:Joi.string(),
                    company:Joi.string(),
                    variant:Joi.string(),
                }),
                params:Joi.object({
                    id:Joi.string().required()
                })
            }
        }
    },
    {
        method: "DELETE",
        path: '/{id}',
        handler: async (req, h) => {
            const {params} = req;
            const {id} = params 
            const isFound = await Vehicle.findOne({_id:id})
            if(isFound){
                await Vehicle.deleteOne({_id:isFound?._id})
                return h.response({status:true,message:'Vehicle deleted successfully'}).code(HttpStatus.OK);
            }else{
                return h.response({ success: false, message: "Vehicle does not exist" }).code(HttpStatus.CONFLICT)
            }   
        },
        options:{
            auth:{
                strategies:["jwt"]
            },
            description:"Delete Vehicle",
            tags:["api"],
            validate:{
                params:Joi.object({
                    id:Joi.string().required()
                })
            }
        }
    },

    {
        method:"GET",
        path:"/all",
        handler:async (req,h)=>{
            const vehicles = await Vehicle.find({});
            if(vehicles && vehicles?.length){
                return h.response({status:true,items:vehicles}).code(HttpStatus.OK);
            }else{
                return h.response({status:true,message:[]}).code(HttpStatus.OK);
            }
        },
        options:{
            auth:{
                strategies:["jwt"],
            },
            description:"Fetch all Vehicles",
            tags:["api"],
        }
    },
    {
        method:"GET",
        path:"/count",
        handler:async (req,h)=>{
            const vehicles = await Vehicle.find({}).count();
                return h.response({status:true,count:vehicles}).code(HttpStatus.OK);
            },
        options:{
            auth:{
                strategies:["jwt"],
            },
            description:"Fetch all Vehicles",
            tags:["api"],
        }
    },
   
    
]