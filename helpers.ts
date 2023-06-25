import axios from "axios";
import { User } from "./src/auth/user.model";

import { convertNumberToCodeFormat } from "./utils";

const axiosInstance = axios.create({
  baseURL: process.env.ENVIRONMENT === "production" ?  'https://rms.24seven.pk:443' : 'https://dev.24seven.pk/',
  })

const generateRandomPassword = (length:number) =>  {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const doesUserExist = async(searchQuery:string) => {
  let number="";
  var regex = /^\d+$/;
  if(regex.test(searchQuery)){
  number = convertNumberToCodeFormat(searchQuery);
  }
  const user = await User.findOne({...(number.includes('+92') ? {mobileNumber:number} : {email:searchQuery}) });
  if(user){
    return user
  }else{
    return false
  }
}





export {
generateRandomPassword,
doesUserExist,
}