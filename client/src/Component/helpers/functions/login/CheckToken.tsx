import axios, { AxiosResponse } from 'axios'
import { ICheck } from '../../../../types/type'

async function CheckToken(token:string,id:number):Promise<ICheck> {
  return axios.post("http://localhost:5000/pass/token",{
    token,id
  })
  .then(({data}:AxiosResponse<ICheck>)=>data)
}

export default CheckToken