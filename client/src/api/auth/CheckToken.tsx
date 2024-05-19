import { ICheck } from '../../libs/types/type'
import { AxiosResponse } from 'axios'
import { baseUrl } from '../baseUrl'

async function CheckToken(token:string,id:number):Promise<ICheck> {
  return baseUrl.post<ICheck>("auth/token",{token,id})
  .then(({data}:AxiosResponse<ICheck>)=>data)
}

export default CheckToken