import axios from "axios"
import { Json } from "sequelize/types/lib/utils";

import { generateHashedPassword } from "./auth/auth.service";
const xml2js = require('xml2js')


const smsCredentials = {
    msisdn:process.env.ENVIRONMENT == 'dev' ? "Development" : 'OBA_Production',
    password: process.env.ENVIRONMENT == 'dev' ? 'f4Xmv27CsY2RZY2q' :'F8aYtWZ6A3VQcXJL',
}

const NetworkConfig = axios.create({
    baseURL:'https://telenorcsms.com.pk:27677/corporate_sms2/api/'
})

export const createSession  = async () => {
    let sessionId='';
    await NetworkConfig.post(`auth.jsp?msisdn=${smsCredentials.msisdn}&password=${smsCredentials.password}`)
    .then((res)=>{
        // console.log('res.data',res.data)
        xml2js.parseString(res.data, (err, result) => {
            if (err) {
              throw err
            }
          
            // `result` is a JavaScript object
            // convert it to a JSON string
            const json = JSON.stringify(result, null, 4)

            sessionId = JSON.parse(json)?.corpsms?.data
            console.log(JSON.parse(json)?.corpsms);
            // log JSON string
            console.log({sessionId})
          })
    })
    return sessionId
}

export const triggerSmsNotification = async (params:{sessionId:string,text:string,contactNumber:string}) => {
    console.log(params.text,params.contactNumber)

    let number = params.contactNumber;

    if(number){
    while(number.charAt(0) === '+' || number.charAt(0) === '9' ||number.charAt(0) === '2' || number.charAt(0) === '0' )
    number = number.substring(1);
    }

    console.log({number});
    
    await NetworkConfig.post(`sendsms.jsp?session_id=${params.sessionId}&to=${'+92'+number}&text=${encodeURI(params.text)}&mask=AD Help`).then((res)=>{
        console.log('res--->',res.data)
    }).catch((err)=>{
        console.log({err})
    })
}

