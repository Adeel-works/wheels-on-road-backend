/** @format */

import HttpStatus from "http-status-codes";
import { ServerRoute } from "@hapi/hapi";
import { User } from "./user.model";
import { generateAccessToken, generateHashedPassword, verifyPassword } from "./auth.service";
import Joi from "joi";
import { generateRandomPassword } from "../../helpers";
import { sendMail } from "../../mail";
const Boom = require('@hapi/boom');

export const AuthRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: '/auth',
    handler: async (req, h) => {
        const {payload} = req;
        const credentials = payload as {email:string,password:string};
        const user = await User.findOne({email:credentials?.email});
        if(user){
            if(user.isActive){
            
            const isPasswordValid = await verifyPassword(user.password,credentials.password);
            if(isPasswordValid){
                const accessTokenBody:Object = {
                    name:user?.name,
                    email:user?.email,
                    isActive:user?.isActive,
                    _id:user?._id
                }
                const accessToken = generateAccessToken(accessTokenBody)
                const response = {
                    accessToken:accessToken,
                    ...accessTokenBody,
                }
                return h.response(response).code(HttpStatus.OK)
            }
            else{
            return h.response({ success: false, message: "Invalid Password" }).code(HttpStatus.CONFLICT)
            }
            
        }else{
            return h.response({success:false,message:"Account is deactivated"}).code(HttpStatus.UNAUTHORIZED);
        }
        }else{
        return h.response({ success: false, message: "Account does not exist." }).code(HttpStatus.CONFLICT)
        }
    },
    options:{
        auth:false,
        tags: ['api'], // ADD THIS TAG
        description:"Login",
        validate:{
            payload:Joi.object({
                email:Joi.string().required().email({tlds:{allow:false}}),
                password:Joi.string().required()
            })
        }
    }
},
{
  method: "POST",
  path: '/sign-up',
  handler: async (req, h) => {
      const {payload} = req;
      const credentials = payload as {email:string,name:string,password?:string};
      const user = await User.findOne({email:credentials?.email});
      if(user){
        return h.response({ success: false, message: "Account associated with this email already exists." }).code(HttpStatus.CONFLICT)
      }else{
      const password =  generateRandomPassword(6);
      const hashed = await generateHashedPassword(password);
      credentials.password=hashed;
      await User.create({...credentials})
      await sendMail({email:credentials?.email,password:password})
      return h.response({ success: false, message: "Account created successfully" }).code(HttpStatus.CONFLICT)
      }
  },
  options:{
      auth:false,
      tags: ['api'], // ADD THIS TAG
      description:"Signup",
      validate:{
          payload:Joi.object({
              name:Joi.string().required(),
              email:Joi.string().required().email({tlds:{allow:false}}),
          })
      }
  }
},
];
