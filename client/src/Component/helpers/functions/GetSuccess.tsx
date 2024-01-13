import axios, { AxiosResponse } from "axios";
import { SubProps, has } from "../../../types/type";

async function GetSuccess(args:SubProps):Promise<has> {   
   return axios
    .post(`http://localhost:5000/pass`,args)
    .then(({data}:AxiosResponse<has>)=>data);
}

export default GetSuccess