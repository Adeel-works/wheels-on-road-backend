import { ServerRoute } from "@hapi/hapi";
import HttpStatus from "http-status-codes";
import { Vehicle } from "../vehicles/index.model";
import { Categories } from "../categories/index.model";



export const DashBoardRoute: ServerRoute[] = [
  
    {
        method:"GET",
        path:"/count",
        handler:async (req,h)=>{
            const vehicles = await Vehicle.find({}).count();
            const categories = await Categories.find({}).count();
                return h.response({status:true,items:{vehicles,categories}}).code(HttpStatus.OK);
            },
        options:{
            auth:{
                strategies:["jwt"],
            },
            description:"Fetch count",
            tags:["api"],
        }
    },
   
    
]