import axios from "axios"

import { User } from "./auth/user.model";

const axiosInstance = axios.create({
    baseURL: 'http://18.140.247.154:8069'
})

const odooConfig =
    process.env.ENVIRONMENT === "production"
        ? {
            url: process.env.ODOO_HOST,
            port: process.env.ODOO_PORT,
            db: process.env.ODOO_DATABASE,
        }
        : {
            url: 'http://18.140.247.154:8069',
            port: 8069,
            db: '27Feb2023_duplicate',
        };

export const syncOdooDataBase = async () => {


    let cookies = ''
    let token = ''



    axiosInstance.post(`/web/session/authenticate`,
        {
            jsonrpc: "2.0",
            params: {
                db: "27Feb2023_duplicate",
                login: "admin",
                password: "codeninja@24seven"
            }
        }
    ).then((res) => {
        console.log('res', res.data);
        token = res?.data?.result?.ocn_token_key
        console.log('token', token);
        const [cookie]: any = res.headers["set-cookie"]
        const arr = cookie.split("=");
        const jsessionid = arr[1];
        cookies = jsessionid.substring(0, jsessionid.length - 9);
        console.log('cookie', cookies)
        axiosInstance.get('/get/leads',
            {
                headers: {
                    'Cookie': `session_id=${cookies}`
                },
            },
        )
    })
}   