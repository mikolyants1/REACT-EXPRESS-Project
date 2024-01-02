import axios, { AxiosResponse } from "axios";
import { has } from "../../../types/type";

async function GetSuccess(name:string,pass:string):Promise<has> {   
   return axios
    .post(`http://localhost:5000/pass`,{name,pass})
    .then(({data}:AxiosResponse<has>)=>data);
}

export default GetSuccess