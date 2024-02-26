import axios, { AxiosResponse } from "axios";
import { ISubProps, IHas } from "../../../../types/type";

async function GetSuccess(args:ISubProps):Promise<IHas> {   
   return axios
    .post(`http://localhost:5000/pass`,args)
    .then(({data}:AxiosResponse<IHas>)=>data);
}

export default GetSuccess