import { IMess } from "../../../libs/types/type";

export default (arg:IMess[],i:number):boolean=>{
    if (i == 0) return true;
    return arg[i].day !== arg[i-1].day;
};