import { ServerRoute } from "@hapi/hapi";
import HttpStatus from "http-status-codes";
import * as Joi from 'joi';
import { Categories, ICategory } from "./index.model";

export const CategoriesRoute: ServerRoute[] = [
    {
        method: "POST",
        path: '/add',
        handler: async (req, h) => {
            const {payload} = req;
            const category = payload as ICategory;
            const isFound = await Categories.findOne({categoryId:category?.categoryId})
            if(isFound){
            return h.response({ success: false, message: "Category already exists" }).code(HttpStatus.CONFLICT)
            }else{
            await Categories.create({...category})
            return h.response({status:true,message:'Category added successfully'}).code(HttpStatus.OK);
            }    
        },
        options:{
            auth:{
                strategies:["jwt"]
            },
            description:"Add New Category",
            tags:["api"],
            validate:{
                payload:Joi.object({
                        name:Joi.string().required(),
                        categoryId:Joi.string().required(),
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
            const category = payload as ICategory;
            const isFound = await Categories.findOne({_id:id})
            if(isFound){
                await Categories.updateOne({_id:isFound?._id},{$set:{...category}})
                return h.response({status:true,message:'Category updated successfully'}).code(HttpStatus.OK);
            }else{
                return h.response({ success: false, message: "Category does not exist" }).code(HttpStatus.CONFLICT)
            }   
        },
        options:{
            auth:{
                strategies:["jwt"]
            },
            description:"Update Category",
            tags:["api"],
            validate:{
                payload:Joi.object({
                        name:Joi.string(),
                        categoryId:Joi.string()
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
            const isFound = await Categories.findOne({_id:id})
            if(isFound){
                await Categories.deleteOne({_id:isFound?._id})
                return h.response({status:true,message:'Category deleted successfully'}).code(HttpStatus.OK);
            }else{
                return h.response({ success: false, message: "Category does not exist" }).code(HttpStatus.CONFLICT)
            }   
        },
        options:{
            auth:{
                strategies:["jwt"]
            },
            description:"Delete Category",
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
            const categories = await Categories.find({});
            if(categories && categories?.length){
                return h.response({status:true,items:categories}).code(HttpStatus.OK);
            }else{
                return h.response({status:true,message:[]}).code(HttpStatus.OK);
            }
        },
        options:{
            auth:{
                strategies:["jwt"],
            },
            description:"Fetch all categories",
            tags:["api"],
        }
    },
    {
        method:"GET",
        path:"/count",
        handler:async (req,h)=>{
            const categories = await Categories.find({}).count();
                return h.response({status:true,count:categories}).code(HttpStatus.OK);
            },
        options:{
            auth:{
                strategies:["jwt"],
            },
            description:"Fetch all Categories",
            tags:["api"],
        }
    },
   
    
]