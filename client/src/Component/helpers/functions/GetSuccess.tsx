import axios, { AxiosResponse } from "axios";
import { has } from "../../../types/type";

async function GetSuccess(name:string,pass:string,regist:boolean):Promise<has> {   
   return axios
    .post(`http://localhost:5000/pass`,{name,pass,regist})
    .then(({data}:AxiosResponse<has>)=>data);
}

export default GetSuccess