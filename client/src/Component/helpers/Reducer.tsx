import { StArr, action2, st, st1, st2 } from "../../types/type"


export function reduce<S,A>(state:S,action:A):S{
  return {
    ...state,...action
  };
};
export function reducer(state:st2,action:action2):st2{
 const entries:StArr[] = Object.entries(state);
 const newState:StArr[] = entries.map((item:StArr,i:number)=>(
    i == action.type ? [item[0],true] : [item[0],false]
    ));
  return Object.fromEntries(newState);
};

export const defaultState1:st = {
    data:null,
    base:null,
    err:false,
    load:true
};

export const defaultState2:st1 = {
    now:0,
    text:"",
    status:false
};

export const defaultState3:st2 = {
    Contacts:true,
    Chats:false,
    Settings:false
};