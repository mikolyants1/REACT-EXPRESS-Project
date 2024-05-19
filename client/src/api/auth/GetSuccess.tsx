import { AxiosResponse } from "axios";
import { baseUrl } from "../baseUrl";
import { IHas, ISubProps } from "../../libs/types/type";

async function GetSuccess(args:ISubProps):Promise<IHas> {   
   return baseUrl.post<IHas>(`/auth`,args)
    .then(({data}:AxiosResponse<IHas>)=>data);
}

export default GetSuccess