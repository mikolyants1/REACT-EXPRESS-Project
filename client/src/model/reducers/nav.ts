import { INavAction, TNavState, TNavStateArr } from "../../libs/types/type";

export function NavReducer(state:TNavState,action:INavAction):TNavState{
    const entries:TNavStateArr[] = Object.entries(state);
    const newState:TNavStateArr[] = entries
    .map((item:TNavStateArr,i:number) => (
      i == action.type ? [item[0],true] : [item[0],false]
     ));
     return Object.fromEntries(newState);
   }