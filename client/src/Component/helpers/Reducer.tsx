import { st, st1 } from "../../types/type"


export function reducer<S,A>(state:S,action:A):S{
  return {
    ...state,...action
  }
}

export const defaultState1:st = {
    data:null,
    err:false,
    load:true
}

export const defaultState2:st1 = {
    now:0,
    text:"",
    status:false
}